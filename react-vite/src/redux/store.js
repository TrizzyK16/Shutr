import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import photosReducer from "./photos";
import groupsReducer from "./groups";
import eventsReducer from "./events";
import proReducer from "./pro";
import favoritesReducer from "./favorites";
import albumsReducer from "./albums";

const rootReducer = combineReducers({
  session: sessionReducer,
  photos: photosReducer,
  groups: groupsReducer,
  events: eventsReducer,
  pro: proReducer,
  favorites: favoritesReducer,
  albums: albumsReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);
  
  // Subscribe to store changes
  store.subscribe(() => {
    const state = store.getState();
    console.log('Store state:', state);
  });
  
  return store;
};

export default configureStore;
