// @flow

import di from '@/services/di.js'
import type { DataRepositoryInterface } from './interfaces/DataRepositoryInterface.js'
import { ApiInterface } from '@/services/api/interfaces/ApiInterface.js'
import dataRepository from './dataRepository.js'

di.constant('dataRepository', dataRepository)
di.factory('repo', function (container: {
  dataRepository: DataRepositoryInterface,
  api: ApiInterface
}) {
  return container.dataRepository(container.api)
})
