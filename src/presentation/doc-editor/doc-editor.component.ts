import * as CodeMirror from 'codemirror';

import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from 'src/commons/socket';
import {Select, Store} from '@ngxs/store';
import {DocEditorActions} from './doc-editor.actions';
import {AuthState} from '../auth/auth.state';
import {consts} from 'src/commons/consts';
import {DocEditorState} from './doc-editor.state';
import {Observable} from 'rxjs';
import {User} from 'src/models/state/user';
import {NotifyUpdateCaret} from 'src/models/socket/notify-update-caret';
import {getWidthOfText} from "../../commons/helper";

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss'],
})
export class DocEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('CodeEditor') private codeEditor: {
    codeMirror: CodeMirror.Editor;
  };

  @Select(AuthState.User)
  currentUser: Observable<User>

  @Select(DocEditorState.DocSessionContent)
  docSessionContent: Observable<string>;

  @Select(DocEditorState.DocSessionUsers)
  docSessionUsers: Observable<User[]>;

  constructor(
    private readonly socketService: SocketService,
    private readonly store: Store
  ) {
  }

  public options = {
    lineNumbers: false,
    theme: 'darcula',
    fontFamily: 'monospace',
    foldGutter: false,
  };

  handleChange(instance: CodeMirror.Editor, change: CodeMirror.EditorChange) {
    if (change.origin !== 'setValue') {
      const user = this.store.selectSnapshot(AuthState.User);

      if (!user) return;

      const value = instance.getValue();

      const saveContent = new DocEditorActions.SaveContent(
        value,
        user.uuid,
        user.top,
        user.currentLineText
      );

      const updateDocSessionContent =
        new DocEditorActions.UpdateDocSessionContent(value);

      // update store
      this.store.dispatch([saveContent, updateDocSessionContent]);
      const socket = this.socketService.getSocket();

      // update via socket
      if (socket) {
        socket.emit(consts.socketEvents.distributeChange, {
          content: value,
          uuid: user.uuid,
        });
      }
    }
  }

  handleCursorActivity() {
    const charHeight = consts.decoEditor.charHeight;
    const doc = this.codeEditor.codeMirror.getDoc();
    const cursor = this.codeEditor.codeMirror.getCursor();

    // calculate
    const currentLineText = doc.getLine(cursor.line).slice(0, cursor.ch);
    const top = (cursor.line + 1) * charHeight - charHeight;

    const user = this.store.selectSnapshot(AuthState.User);
    const socket = this.socketService.getSocket();

    if (!socket || !user) return;

    socket.emit(consts.socketEvents.distributeCaret, {
      top,
      currentLineText: currentLineText,
      uuid: user.uuid,
    });
  }

  public left = 0;
  public top = 0;
  public setter: () => void;

  public getWidthOfText = getWidthOfText;

  ngAfterViewInit() {
    this.setter = () => {
      const element = document.querySelector<HTMLDivElement>('.CodeMirror');

      this.left = element?.getBoundingClientRect().left || 0;
      this.top = element?.getBoundingClientRect().top || 0;
    };

    setTimeout(() => this.setter(), 0);
    window.addEventListener('resize', () => this.setter());
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.codeEditor.codeMirror.on('change', (i, c) =>
        this.handleChange(i, c)
      );
    }, 0);

    const socket = this.socketService.connect();

    socket.on(
      consts.socketEvents.notifyUpdate,
      (res: { content: string; uuid: string }) => {

        // update content
        this.store.dispatch(
          new DocEditorActions.UpdateDocSessionContent(res.content)
        );
      }
    );

    // add user and caret
    socket.on(consts.socketEvents.userAdded, (res: User) => {
      console.log('added', res)
      this.store.dispatch(new DocEditorActions.UpdateUser(res, 'add'));
    });

    // remove user and caret
    socket.on(consts.socketEvents.userRemoved, (res: User) => {
      this.store.dispatch(new DocEditorActions.UpdateUser(res, 'del'));
    });

    // update caret
    socket.on(
      consts.socketEvents.notifyUpdateCaret,
      (res: NotifyUpdateCaret) => {
        this.store.dispatch(new DocEditorActions.UpdateCaretPosition(res));
      }
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.setter());
  }

  toNumber(...args: any[]) {
    return args.reduce((acc, cur) => {
      // console.log(cur);
      return acc + parseInt(cur)
    }, 0);
  }
}
