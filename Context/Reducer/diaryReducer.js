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

export const requestAddDiary = (newDiary) => async (dispatch, getState) => {
    try {
        dispatch(addDiary(newDiary));
    } catch (err) {
        console.log(`requestAddDiary err: ${err}`);
    }
}

const initState = {
	diary: [
		{ id: '2022-02-18', content: '내용입니다', emoji: '😃'}
	],
}

export default function diaryReducer(state = initState, action) {
	switch (action.type) {
        case ACTION_ADD_DIARY: 	            return AddDiary(state, action);
		case ACTION_DELETE_DIARY:			return DeleteDiary(state, action);
		case ACTION_UPDATE_DIARY:			return UpdateDiary(state, action);
		default:					        return state;
	}
}