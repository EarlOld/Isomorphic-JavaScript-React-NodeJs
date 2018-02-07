import React from 'react'
import ReactDOM   from 'react-dom'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import routes from './routes'
import rootSaga from './redux/sagas'
import logger from 'redux-logger'
import rootReducer from './redux/reducers'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware, logger))
const history = syncHistoryWithStore(browserHistory, store)

const component = (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(component, document.getElementById('react-view'))
