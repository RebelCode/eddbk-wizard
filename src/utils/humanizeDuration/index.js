import HumanizeDuration from 'humanize-duration'
import nonPluralEnglish from './languages/nonPluralEnglish'

/**
 * Humanize duration factory function.
 *
 * @since [*next-version*]
 *
 * @param {object} options Humanizer options
 *
 * @return {HumanizeDuration}
 */
const humanizeDurationFactory = (options = {}) => {
  const defaults = {
    units: ['w', 'd', 'h', 'm'],
    round: true
  }
  return HumanizeDuration.humanizer(Object.assign({}, defaults, options))
}

/**
 * Non plural humanizer version.
 *
 * @since [*next-version*]
 *
 * @type {HumanizeDuration}
 */
export const nonPluralHumanizeDuration = humanizeDurationFactory({
  language: 'nonPluralEnglish',
  languages: {
    nonPluralEnglish
  }
})

/**
 * Default humanizer.
 *
 * @since [*next-version*]
 *
 * @type {humanizeDuration}
 */
export const humanizeDuration = humanizeDurationFactory()
