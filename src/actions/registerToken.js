import { REGISTER_TOKEN } from '../constants';

export function registerToken(token) {
    return {
        type: REGISTER_TOKEN,
        payload: token,
    };
}
