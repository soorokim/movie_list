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

//TODO: 뭔지 모름
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//TODO: 뭔지 모름
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

function configureStore() {
    const store = createStore(rootReducer, enhancers);

    sagaMiddleware.run(rootSaga);

    /*//TODO: 뭔지 모름 hot loader 를 사용하지 않음 ( 사용할줄 모름 )
    if (module.hot) {
        module.hot.accept('reducers', () => {
            store.replaceReducer(require('reducers').default)
        })
    }
    */

    return store;
}

export const store = configureStore();
