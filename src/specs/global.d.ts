import type chai from 'chai'

declare global {
  // eslint-disable-next-line no-var
  var expect: typeof chai.expect
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {History} from 'history'

declare module 'history' {
  interface History {
    get index(): number
  }
}
