// @flow

import SessionsRepo from './sessions'
import { ApiInterface } from '@/services/api/interfaces/ApiInterface.js'

export default function (api: ApiInterface) {
  return {
    sessions: new SessionsRepo(api)
  }
}
