import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doc-cursor',
  template: `
    <div style="position: relative;">
      <div
        style="position: absolute;top: -30px;color: black;border-radius: 3px;margin: 0;padding: 2px 5px;font-size: 14px"
        [style.background-color]="backgroundColor"
      >
        {{ name }}
      </div>
      <div
        [style.background-color]="backgroundColor"
        style="height: 20px;width: 2px;"
      ></div>
    </div>
  `,
})
export class DocEditorCursorComponent {
  @Input('name') name: string;
  @Input('backgroundColor') backgroundColor: string;
}
