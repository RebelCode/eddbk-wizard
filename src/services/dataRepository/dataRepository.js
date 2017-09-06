export default function (api: any) {
  return {
    getSessions ({ serviceId, start, end }) {
      // @todo - cache fetched data
      return api.fetchSessions({ serviceId, start, end })
    }
  }
}
