import { REGISTER_TOKEN } from '../constants';

const initialState = {
    token: null,
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default tokenReducer;
