import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import createSageMiddleware from "redux-saga";
import rootSaga from "./root-saga";

const sagaMiddleware = createSageMiddleware();

const middlewares = [sagaMiddleware, logger];

// if (process.env.NODE_ENV === "development") {
//   const { logger } = require(`redux-logger`);
//   middlewares.push(logger);
// }

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
