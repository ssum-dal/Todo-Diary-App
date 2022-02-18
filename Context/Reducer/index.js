import { combineReducers } from 'redux'
import projectReducer from './projectReducer';
import diaryReducer from './diaryReducer';

const reducers = combineReducers({
	project: projectReducer,
	diary: diaryReducer,
});

export default reducers;