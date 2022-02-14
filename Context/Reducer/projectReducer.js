const ACTION_ADD_PROJECT = 'project/add_project';
const ACTION_DELETE_PROJECT = 'project/delete_project';
const ACTION_UPDATE_PROJECT = 'project/update_project';
const ACTION_ADD_WORK = 'project/add_work';
const ACTION_DELETE_WORK = 'project/delete_work';
const ACTION_UPDATE_WORK = 'project/update_work';
const ACTION_UPDATE_COMPLETE = 'project/update_complete';

const addProject = (newProject) => ({
	type: ACTION_ADD_PROJECT,
	newProject,
});

function AddProject(state, action) {
	let newState = { ...state };
	const { newProject } = action;
	const { project: prev } = newState;
	
	newState.project = [ ...prev, newProject ];

	return newState;
}

const deleteProject = (projectId) => ({
	type: ACTION_DELETE_PROJECT,
	projectId,
});

function DeleteProject(state, action) {
	let newState = { ...state };
	const { projectId } = action;
	
	newState.project = newState.project.filter(item => item.id !== projectId);

	return newState;
}

const updateProject = (projectId, name) => ({
	type: ACTION_UPDATE_PROJECT,
	projectId, name
});

function UpdateProject(state, action) {
	let newState = { ...state };
	const { projectId, name } = action;
	
	const index = newState.project.findIndex(item => item.id === projectId);
	newState.project[index].title = name;
	newState.project = [...newState.project.slice(0, index), newState.project[index], ...newState.project.slice(index+1)]
	
	return newState;
}

const addWork = (newWork, index) => ({
	type: ACTION_ADD_WORK,
	newWork, index
});

function AddWork(state, action) {
	let newState = { ...state };
	const { newWork, index } = action;

	newState.project[index].works = [ newWork, ...newState.project[index].works];

	return newState;
}

const deleteWork = (projectIndex, workId) => ({
	type: ACTION_DELETE_WORK,
	projectIndex, workId,
});

function DeleteWork(state, action) {
	let newState = { ...state };
	const { projectIndex, workId } = action;
	
	newState.project[projectIndex].works = newState.project[projectIndex].works.filter(item => item.id !== workId);

	return newState;
}

const updateWork = (projectIndex, workId, title, isToday, deadline) => ({
	type: ACTION_UPDATE_WORK,
	projectIndex, workId, title, isToday, deadline
});

function UpdateWork(state, action) {
	let newState = { ...state };
	const { projectIndex, workId, title, isToday, deadline } = action;
	const workIndex = newState.project[projectIndex].works.findIndex(item => item.id === workId);
	
	newState.project[projectIndex].works[workIndex].title = title;
	newState.project[projectIndex].works[workIndex].isToday = isToday;
	newState.project[projectIndex].works[workIndex].deadline = deadline;

	newState.project[projectIndex].works = [
		...newState.project[projectIndex].works.slice(0, workIndex),
		newState.project[projectIndex].works[workIndex],
		...newState.project[projectIndex].works.slice(workIndex+1)
	];

	return newState;
}

const updateComplete = (projectIndex, workId, isChecked) => ({
	type: ACTION_UPDATE_COMPLETE,
	projectIndex, workId, isChecked
});

function UpdateComplete(state, action) {
	let newState = { ...state };
	const { projectIndex, workId, isChecked } = action;
	const workIndex = newState.project[projectIndex].works.findIndex(item => item.id === workId);
	newState.project[projectIndex].works[workIndex].isCompleted = isChecked;

	newState.project[projectIndex].works = [
		...newState.project[projectIndex].works.slice(0, workIndex),
		newState.project[projectIndex].works[workIndex],
		...newState.project[projectIndex].works.slice(workIndex+1)
	];

	return newState;
}

export const requestAddProject = (newProject) => async (dispatch, getState) => {
    try {
        dispatch(addProject(newProject));
    } catch (err) {
        console.log(`requestAddProject err: ${err}`);
    }
}

export const requestDeleteProject = (projectId) => async (dispatch, getState) => {
    try {
        dispatch(deleteProject(projectId));
    } catch (err) {
        console.log(`requestDeleteProject err: ${err}`);
    }
}

export const requestUpdateProject = (projectId, name) => async (dispatch, getState) => {
    try {
        dispatch(updateProject(projectId, name));
    } catch (err) {
        console.log(`requestUpdateProject err: ${err}`);
    }
}

export const requestAddWork = (newWork, index) => async (dispatch, getState) => {
    try {
        dispatch(addWork(newWork, index));
    } catch (err) {
        console.log(`requestAddWork err: ${err}`);
    }
}

export const requestDeleteWork = (projectIndex, workId) => async (dispatch, getState) => {
    try {
        dispatch(deleteWork(projectIndex, workId));
    } catch (err) {
        console.log(`requestDeleteWork err: ${err}`);
    }
}

export const requestUpdateWork = (projectIndex, workId, title, isToday, deadline) => async (dispatch, getState) => {
    try {
        dispatch(updateWork(projectIndex, workId, title, isToday, deadline));
    } catch (err) {
        console.log(`requestUpdateWork err: ${err}`);
    }
}

export const requestUpdateComplete = (projectIndex, workId, isChecked) => async (dispatch, getState) => {
    try {
        dispatch(updateComplete(projectIndex, workId, isChecked));
    } catch (err) {
        console.log(`requestUpdateComplete err: ${err}`);
    }
}

const initState = {
	project: [
		{ id: 0, title: '할 일', works: [] }
	],
}

export default function projectReducer(state = initState, action) {
	switch (action.type) {
        case ACTION_ADD_PROJECT: 	        return AddProject(state, action);
		case ACTION_DELETE_PROJECT:			return DeleteProject(state, action);
		case ACTION_UPDATE_PROJECT:			return UpdateProject(state, action);
		case ACTION_ADD_WORK:				return AddWork(state, action);
		case ACTION_DELETE_WORK:			return DeleteWork(state, action);
		case ACTION_UPDATE_WORK:			return UpdateWork(state, action);
		case ACTION_UPDATE_COMPLETE:		return UpdateComplete(state, action);
		default:					        return state;
	}
}