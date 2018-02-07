import { put, takeEvery, fork, call } from 'redux-saga/effects'

import {
  ADD_POST,
  posts
} from '../actions'

const actions = [
  ADD_POST
]

function* addPost() {
  yield put(posts.addPost({
    success: true,
    payload: 'Post added'
  }))
}


function* postsWorker({ type, payload }) {
  switch (type) {
    case ADD_POST:
      yield fork(addPost, payload)
      break
    default:
  }
}

function* watchPosts() {
  yield takeEvery(actions, postsWorker)
}

export default watchPosts
