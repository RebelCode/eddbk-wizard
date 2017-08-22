// @flow

export interface StoreManagerInterface {
  get(path: string): any;
  set(path: string, payload: {}): void;
  dispatch(type: string, payload: {}): any;
}
