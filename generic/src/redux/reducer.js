import { NEW_OBJ, SAVE_ALL_OBJ } from './actions';

const initialState = {
    rootObjectList: [],
    newObjectsJsonArr: []
}

function objReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_ALL_OBJ:
            return {
                ...state,
                rootObjectList: action.payload,
            }
        case NEW_OBJ:
            return {
                ...state,
                newObjectsJsonArr: action.payload,
            }
        default:
            return state
    };
};

export default objReducer;