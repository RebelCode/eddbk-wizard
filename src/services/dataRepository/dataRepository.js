import SessionsRepo from './sessions'

export default function (api: any) {
  return {
    sessions: new SessionsRepo({ api })
  }
}
