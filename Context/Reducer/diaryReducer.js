const ACTION_ADD_DIARY = 'diary/add_diary';
const ACTION_DELETE_DIARY = 'diary/delete_diary';
const ACTION_UPDATE_DIARY = 'diary/update_diary';

const addDiary = (newDiary) => ({
	type: ACTION_ADD_DIARY,
	newDiary,
});

function AddDiary(state, action) {
	let newState = { ...state };
	const { newDiary } = action;
	const { diary: prev } = newState;
	
	newState.diary = [ ...prev, newDiary ];

	return newState;
}

const deleteDiary = (diaryId) => ({
	type: ACTION_DELETE_DIARY,
	diaryId,
});

function DeleteDiary(state, action) {
	let newState = { ...state };
	const { diaryId } = action;
	
	newState.diary = newState.diary.filter(item => item.id !== diaryId);

	return newState;
}

const updateDiary = (diaryId, content, emoji) => ({
	type: ACTION_UPDATE_DIARY,
	diaryId, content, emoji
});

function UpdateDiary(state, action) {
	let newState = { ...state };
	const { diaryId, content, emoji } = action;
	
	const index = newState.diary.findIndex(item => item.id === diaryId);
	newState.diary[index].content = content;
    newState.diary[index].emoji = emoji;
	newState.diary = [...newState.diary.slice(0, index), newState.diary[index], ...newState.diary.slice(index+1)]
	
	return newState;
}


export const requestAddDiary = (newDiary) => async (dispatch, getState) => {
    try {
        dispatch(addDiary(newDiary));
    } catch (err) {
        console.log(`requestAddDiary err: ${err}`);
    }
}

export const requestDeleteDiary = (diaryId) => async (dispatch, getState) => {
    try {
        dispatch(deleteDiary(diaryId));
    } catch (err) {
        console.log(`requestDeleteDiary err: ${err}`);
    }
}

export const requestUpdateDiary = (diaryId, content, emoji) => async (dispatch, getState) => {
    try {
        dispatch(updateDiary(diaryId, content, emoji));
    } catch (err) {
        console.log(`requestUpdateDiary err: ${err}`);
    }
}

const initState = {
	diary: [],
}

export default function diaryReducer(state = initState, action) {
	switch (action.type) {
        case ACTION_ADD_DIARY: 	            return AddDiary(state, action);
		case ACTION_DELETE_DIARY:			return DeleteDiary(state, action);
		case ACTION_UPDATE_DIARY:			return UpdateDiary(state, action);
		default:					        return state;
	}
}