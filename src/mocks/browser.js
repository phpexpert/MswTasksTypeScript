import { setupWorker } from 'msw'
import { handlers } from './handlers'

// Configure Mock Service Worker for in-browser request interception.
export const worker = setupWorker(...handlers)
