import { createStore, combineReducers } from 'redux';
import tokenReducer from '../reducers/tokenReducer';

const rootReducer = combineReducers({
    token: tokenReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
};
export default configureStore;
