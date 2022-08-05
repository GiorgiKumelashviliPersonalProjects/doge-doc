import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

const defaults = {
  markdown:
    '# Heading\n\nSome **bold** and _italic_ text\nBy [Scott Cooper](https://github.com/scttcper)',
  'text/typescript': `const component = {
  name: "@ctrl/ngx-codemirror",
  author: "Scott Cooper",
  repo: "https://github.com/scttcper/ngx-codemirror"
};
const hello: string = 'world';`,
};

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss'],
})
export class DocEditorComponent implements OnInit {
  @Select((state: any) => state) all$!: Observable<any>;

  content = 'adasd';

  readOnly = false;
  mode: keyof typeof defaults = 'markdown';
  options = {
    lineNumbers: false,
    mode: this.mode,
    theme: 'darcula',
    fontFamily: 'monospace',
  };
  defaults = defaults;

  handleChange($event: Event): void {
    console.log('ngModelChange', $event);
  }

  constructor() {}

  ngOnInit(): void {}
}
