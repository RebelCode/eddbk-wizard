// @flow
import { ApiInterface } from '@/services/api/interfaces/ApiInterface.js'
import { SessionsRepoInterface } from './SessionsRepoInterface.js'

export type DataRepositoryInterface = (api: ApiInterface) => {
  sessions: SessionsRepoInterface
}
