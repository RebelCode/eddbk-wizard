// @flow
import { vsprintf } from 'sprintf-js'

export default {
  translate: function (format: string, params: ?Array<mixed>, context: ?string) {
    return vsprintf(format, params)
  }
}
