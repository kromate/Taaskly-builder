import { logEvent } from 'firebase/analytics'
import { analytics } from './init'

logEvent(analytics, 'init')
