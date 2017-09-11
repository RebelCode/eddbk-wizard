// @flow

export type SessionItem = {
  uId: string,
  serviceId: number | string,
  duration: number,
  end: number,
  start: number
}

export interface SessionsRepoInterface {
  load ({ serviceId: number | string, start: number, end: number }): Promise<Array<SessionItem>>,
  find (predicate: Function): Array<SessionItem>,
  all (): Array<SessionItem>
}
