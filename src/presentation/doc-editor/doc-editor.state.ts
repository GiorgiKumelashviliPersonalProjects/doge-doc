import {Action, State, StateContext, StateToken} from "@ngxs/store";
import {DocSession} from "../../models/state/doc-session";
import {DocEditorActions} from "./doc-editor.actions";
import {http} from "../../commons/http";
import {showErrorNotification} from "../../commons/helper";
import {patch, updateItem} from "@ngxs/store/operators";
import {User} from "../../models/state/user";
import {Injectable} from "@angular/core";

interface DocEditorModel {
  docSession: Partial<DocSession>
}

const DocEditorStateToken = new StateToken<DocEditorModel>('doc');

@State({
  name: DocEditorStateToken,
  defaults: {
    docSession: {}
  }
})
@Injectable({providedIn: 'root'})
export class DocEditorState {
  @Action(DocEditorActions.SaveContent)
  public async saveContent(ctx: StateContext<DocEditorModel>, action: DocEditorActions.SaveContent) {
    try {
      return await http.put('/doc-data', action);
    } catch (error) {
      showErrorNotification(error);
      return null;
    }
  }

  @Action(DocEditorActions.UpdateDocSession)
  public updateDocSession(ctx: StateContext<DocEditorModel>, action: DocEditorActions.UpdateDocSession) {
    ctx.setState({docSession: action.docSession})
  }


  @Action(DocEditorActions.UpdateDocSessionContent)
  public updateDocSessionContent(ctx: StateContext<DocEditorModel>, action: DocEditorActions.UpdateDocSessionContent) {
    ctx.setState({
      docSession: {
        ...ctx.getState().docSession,
        content: action.content
      }
    })
  }

  @Action(DocEditorActions.UpdateCaretPosition)
  public updateCaretPosition(ctx: StateContext<DocEditorModel>, action: DocEditorActions.UpdateCaretPosition) {
    const user = ctx.getState().docSession.users?.find(el => el.uuid === action.res.uuid);

    // update user properties inside doc session users
    if (user) {
      ctx.setState(
        patch({
          docSession: patch({
            users: updateItem<User>(u => u?.uuid === action.res.uuid, patch({
              top: action.res.top,
              currentLineText: action.res.currentLineText
            }))
          })
        })
      )
    }
  }

  @Action(DocEditorActions.UpdateUser)
  public updateUser(ctx: StateContext<DocEditorModel>, action: DocEditorActions.UpdateUser) {
    let newUsers: User[] = [];

    if (action.type === 'add') {
      newUsers = ctx.getState().docSession?.users ?? [];
      newUsers.push(action.user);
    }

    if (action.type === 'del') {
      newUsers = ctx.getState().docSession?.users?.filter(el => el.uuid !== action.user.uuid) ?? [];
    }

    ctx.setState(patch({docSession: patch({users: newUsers})}));
  }
}
