// @flow

export interface ApiInterface {
  fetchServices(): Promise<any>;
  fetchSessions({ serviceId: string | number, start: number, end: number }): Promise<any>;
  createBooking({ start: string, end: string, service: number, clientTz: string, notes: string|null }): Promise<any>;
}
