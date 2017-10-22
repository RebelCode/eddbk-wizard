import bottle from '@/services/'
import App from './app.js'

const BookingWizardManager = {
  bottle,
  getDefaultBottle () {
    return Object.assign(Object.create(bottle), bottle) // clone
  },
  create (bottle = this.getDefaultBottle()) {
    return new App(bottle)
  }
}

window.BookingWizardManager = BookingWizardManager
