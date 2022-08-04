import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss'],
})
export class DocEditorComponent implements OnInit {
  @Select((state: any) => state) all$!: Observable<any>;

  constructor() {}

  ngOnInit(): void {}
}
