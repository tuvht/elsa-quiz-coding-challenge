import { ACTION_BREADCRUMB } from '../constants/action.constant';

const initialState = {
    breadcrumbs: {
        title: 'Home',
        breadcrumbItems: [
            {
                label: 'Home',
                haslink: false,
                path: '/'
            }
        ]
    }
};

const breadcrumbReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACTION_BREADCRUMB.SET_BREADCRUMB:
            return {
                ...state,
                breadcrumbs: payload
            };

        case ACTION_BREADCRUMB.CLEAR_BREADCRUMB:
            return {
                ...state,
                breadcrumbs: payload
            };

        default:
            return state;
    }
};

export default breadcrumbReducer;
