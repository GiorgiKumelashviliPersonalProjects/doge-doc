import {DocEditorType} from "../models/enums/doc-data.enum";

export const consts = {
  title: 'Doge Doc',
  subTitle: 'New Document',
  backendApiUrl: process.env['NG_APP_BACKEND'] || '',
  backendApiUrlRoot: process.env['NG_APP_BACKEND_ROOT'] || '',

  topBar: {
    height: 80,
  },

  spacer: {
    height: 20,
  },

  decoEditor: {
    charHeight: 20,
  },

  socketEvents: {
    userRemoved: 'user_removed',
    userAdded: 'user_added',
    notifyUpdate: 'notify_update',
    notifyUpdateCaret: 'notify_update_caret',
    distributeCaret: 'distribute_caret',
    distributeChange: 'distribute_change',
  },
};

//todo
//  descendant type is missing
//  export const docEditorStateDefaultValue: Descendant[] = [
export const docEditorStateDefaultValue: any[] = [
  {
    type: DocEditorType.PARAGRAPH,
    children: [{text: 'Start typing...'}],
  },
];

