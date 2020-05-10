import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../Reducers'
import rootSaga from '../Sagas'

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose

const sagaMiddleware = createSagaMiddleware()

const configStore = () => {
  const middlewates = [thunk, sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewates)]
  const store = createStore(rootReducer, composeEnhancers(...enhancers))
  sagaMiddleware.run(rootSaga)
  return store
}

export default configStore
