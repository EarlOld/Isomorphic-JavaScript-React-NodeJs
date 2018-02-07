/* eslint func-style: ["error", "expression"]*/

import { SUCCESS_ADD_POST } from '../actions'

const initialState = { value: '' }

const postsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SUCCESS_ADD_POST:
      return { ...state, value: payload }
    default:
      return state
  }
}

export default postsReducer
