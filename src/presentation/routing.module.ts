import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {DocEditorComponent} from "./doc-editor/doc-editor.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  { path: '', component: DocEditorComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
