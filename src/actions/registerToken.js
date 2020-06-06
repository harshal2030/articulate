import { REGISTER_TOKEN } from '../constants';

export function regsiterToken(token) {
    return {
        type: REGISTER_TOKEN,
        payload: token,
    };
}
