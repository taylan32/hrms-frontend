import { userProps } from '../initialStates/userProps'

import { LOGIN, SIGN_OUT } from '../actions/userActions'

const initialState = {
    userProps: userProps
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                userProps: {
                    ...state.userProps,
                    user: { ...payload.user },
                    userType: payload.userType,
                    loggedIn: true
                }
            }

        case SIGN_OUT:
            return {
                ...state,
                userProps: {
                    ...state.userProps,
                    user: null,
                    userType: null,
                    loggedIn: false
                }
            }
    }
}