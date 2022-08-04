import en from '@angular/common/locales/en';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './routing.module';
import { PresentationComponent } from './presentation.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { AuthComponent } from './auth/auth.component';
import { DocEditorComponent } from './doc-editor/doc-editor.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth/auth.state';
import { DocEditorModel, DocEditorState } from './doc-editor/doc-editor.state';

registerLocaleData(en);

export type StoreState = {
  auth: AuthStateModel;
  doc: DocEditorModel;
};

@NgModule({
  declarations: [PresentationComponent, AuthComponent, DocEditorComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    NzButtonModule,
    NzFormModule,
    NzInputModule,

    FormsModule,
    ReactiveFormsModule,

    NgxsModule.forRoot([AuthState, DocEditorState]),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [PresentationComponent],
})
export class PresentationModule {}
