// @flow

import di from '@/services/di.js'
// import { DataRepositoryInterface } from './interfaces/DataRepositoryInterface.js'
import dataRepository from './dataRepository.js'

di.constant('dataRepository', dataRepository)
di.factory('repo', function (container: { dataRepository: any, api: any }) { // @todo — describe the interfaces
  return container.dataRepository(container.api)
})
