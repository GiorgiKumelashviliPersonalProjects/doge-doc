import {Injectable} from "@angular/core";
import {Action, State, StateContext, StateToken, Store} from "@ngxs/store";
import {AuthActions} from "./auth.actions";
import {http} from "../../commons/http";
import {DocSession} from "../../models/state/doc-session";
import {User} from "../../models/state/user";
import {showErrorNotification} from "../../commons/helper";
import {DocEditorActions} from "../doc-editor/doc-editor.actions";


interface AuthStateModel {
  isAuth: boolean,
  user: any
}

export const AuthStateToken = new StateToken<AuthStateModel>('auth');

@State({
  name: AuthStateToken,
  defaults: {
    isAuth: false,
    user: {}
  }
})
@Injectable({providedIn: 'root'})
export class AuthState {
  constructor(private readonly store: Store) {
  }

  @Action(AuthActions.Authenticate)
  public async authenticate(ctx: StateContext<AuthStateModel>, action: AuthActions.Authenticate) {
    try {
      const {data} = await http.post<{ docState: DocSession; user: User }>('/auth', {username: action.username,});

      // set user
      this.store.dispatch(new DocEditorActions.UpdateDocSession(data.docState));

      ctx.setState({
        user: data.user,
        isAuth: true
      });
    } catch (error) {
      showErrorNotification(error);
    }
  }
}
