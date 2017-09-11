// @flow

import di from '@/services/di.js'
import translate from './translate.js'
import { FormatTranslatorInterface } from './interfaces/FormatTranslatorInterface.js'

di.constant('translator', translate)

di.factory('translate', function (container: { translator: FormatTranslatorInterface }) {
  return container.translator.translate
})
