import _trimEnd from 'lodash/trimEnd';
import _trimStart from 'lodash/trimStart';
import trim from 'lodash/trim';

export const trimStartFor = (toTrim: string) => (str: string) => _trimStart(str, toTrim);
export const trimEndFor = (toTrim: string) => (str: string) => _trimEnd(str, toTrim);

export const trimStartSlash = trimStartFor('/');
export const trimEndSlash = trimEndFor('/');
