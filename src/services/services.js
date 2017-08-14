import Bottle from 'bottlejs';
const di = new Bottle();
import translate from './i18n/translate.js';

di.service('translate', translate);

export default di.container;
