export namespace AuthActions {
  export class Authenticate {
    public static readonly type: string = '[AuthActions] Authenticate'

    constructor(public username: string) {
    }
  }
}


