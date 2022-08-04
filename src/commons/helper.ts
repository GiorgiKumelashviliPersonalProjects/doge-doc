import {AxiosError} from 'axios';
import {consts} from "./consts";

/**
 * rounds by 20 because thats height of each div in doc
 */
export const roundHeight = (x: number) => {
  return Math.ceil(x / consts.decoEditor.charHeight) * consts.decoEditor.charHeight;
};

/**
 * get width of given text with temp span
 */
export const getWidthOfText = (txt: string) => {
  const el = document.createElement('div');
  el.style.visibility = 'hidden';
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  el.classList.add('cm-line');
  el.style.fontFamily = 'monospace'; //! crucial
  el.innerText = txt;

  document.body.appendChild(el);
  const offsetWidth = el.offsetWidth;
  document.body.removeChild(el);

  return offsetWidth;
};


/**
 * self-explanatory
 */
export const showErrorNotification = (error: any) => {
  let errMessage: string;

  if (error instanceof AxiosError) {
    errMessage = error.response?.data?.message || 'unknown error';
  } else {
    errMessage = 'unknown error';
  }

  //todo replace this with zoro message or find another package
  alert(errMessage);
};

