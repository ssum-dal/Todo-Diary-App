import { applyMiddleware, createStore } from 'redux';
import reducers from './Reducer';
import ReduxThunk  from 'redux-thunk';

const appStore = createStore(reducers, applyMiddleware(ReduxThunk));
export default appStore;