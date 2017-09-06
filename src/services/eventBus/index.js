// @flow

import di from '@/services/di.js'
import { EventBusInterface } from './interfaces/EventBusInterface.js'
import Vue from 'vue'

const eventHub: EventBusInterface = new Vue()

di.constant('eventHub', eventHub)
