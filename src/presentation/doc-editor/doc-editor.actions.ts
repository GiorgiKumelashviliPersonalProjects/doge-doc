import {NotifyUpdateCaret} from "../../models/socket/notify-update-caret";
import {User} from "../../models/state/user";
import {DocSession} from "../../models/state/doc-session";

export namespace DocEditorActions {
  export class SaveContent {
    public static readonly type: string = '[DocEditorActions] SaveContent'

    constructor(
      public readonly content: string,
      public readonly uuid: string,
      public readonly top: number,
      public readonly currentLineText: string
    ) {
    }
  }

  export class UpdateDocSessionContent {
    public static readonly type: string = '[DocEditorActions] UpdateDocSessionContent'

    constructor(public readonly content: string) {
    }
  }

  export class UpdateDocSession {
    public static readonly type: string = '[DocEditorActions] UpdateDocSession'

    constructor(public readonly docSession: DocSession) {
    }
  }

  export class UpdateCaretPosition {
    public static readonly type: string = '[DocEditorActions] UpdateCaretPosition'

    constructor(public readonly res: NotifyUpdateCaret) {
    }
  }

  export class UpdateUser {
    public static readonly type: string = '[DocEditorActions] UpdateUser'

    constructor(
      public readonly user: User,
      public readonly type: 'add' | 'del'
    ) {
    }
  }
}
