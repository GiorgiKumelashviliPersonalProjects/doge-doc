import en from '@angular/common/locales/en';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './routing.module';
import { PresentationComponent } from './presentation.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthComponent } from './auth/auth.component';
import { DocEditorComponent } from './doc-editor/doc-editor.component';

registerLocaleData(en);

@NgModule({
  declarations: [PresentationComponent, AuthComponent, DocEditorComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    NzButtonModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [PresentationComponent],
})
export class PresentationModule {}
