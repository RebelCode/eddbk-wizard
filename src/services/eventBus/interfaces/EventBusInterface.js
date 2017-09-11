// @flow

export interface EventBusInterface {
  $emit (channel: string, payload: any): void,
  $on (channel: string, fn: Function): void,
  $off (channel: string, fn: Function): void,
  $once (channel: string, fn: Function): void
}
