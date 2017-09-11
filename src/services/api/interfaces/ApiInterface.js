// @flow

export interface ApiInterface {
  fetchServices(): Promise<any>;
  fetchSessions({ serviceId: string | number, start: number, end: number }): Promise<any>;
}
