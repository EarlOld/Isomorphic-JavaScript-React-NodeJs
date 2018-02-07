import { all } from 'redux-saga/effects'

import posts from './postsSaga'

function* rootSaga() {
  yield all([
    posts()
  ])
}

export default rootSaga
