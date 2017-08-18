// @flow

export interface HttpHandlerInterface {
  get(url: string, args: ?{}): {};
  post(url: string, args: ?{}): {};
}
