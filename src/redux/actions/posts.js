import {
  genActionType,
  genActionCreators
} from './helpers'

const genNotesAction                = genActionType({ module: 'post' })

const ADD_POST                      = genNotesAction('ADD_POST')
const SUCCESS_ADD_POST              = genNotesAction('ADD_POST', { success: true })
const FAIL_ADD_POST                 = genNotesAction('ADD_POST', { success: false })

const actionCreators = {
  addPost: {
    default: ADD_POST,
    success: SUCCESS_ADD_POST,
    failure: FAIL_ADD_POST
  }
}

const posts = genActionCreators(actionCreators)

export {
  posts as default,

  ADD_POST,
  SUCCESS_ADD_POST,
  FAIL_ADD_POST
}
