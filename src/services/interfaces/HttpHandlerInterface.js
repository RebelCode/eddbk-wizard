// @flow

export interface HttpHandlerInterface {
  get(url: string, args?: ?{}): Promise<any>;
  post(url: string, args?: ?{}): Promise<any>;
}
