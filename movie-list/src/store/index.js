import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
//TODO: 뭔지 모름
import logger from 'redux-logger';

import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();
import rootReducer from '../reducers';

const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    logger,
];

//개발자도구
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middlewares));

function configureStore() {
    const store = createStore(rootReducer, enhancers);

    sagaMiddleware.run(rootSaga);

    return store;
}

export const store = configureStore();
