// @flow

import di from '@/services/di.js'
import { EventBusInterface } from './interfaces/EventBusInterface.js'
import Vue from 'vue'

const eventBus: EventBusInterface = new Vue()

di.constant('eventBus', eventBus)
