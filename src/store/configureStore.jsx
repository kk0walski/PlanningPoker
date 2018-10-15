import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import Board from "../reducers/Board";
import user from "../reducers/user";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const appReducer = combineReducers({
    Board,
    user
  });

  const rootReducer = (state, action) => {
    if (action.type === "LOG_OUT") {
      state = undefined;
    }

    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
