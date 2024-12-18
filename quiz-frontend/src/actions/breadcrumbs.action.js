import { ACTION_BREADCRUMB } from '../constants/action.constant';

export const setBreadcrumb = (breadcrumbs) => ({
    type: ACTION_BREADCRUMB.SET_BREADCRUMB,
    payload: breadcrumbs
});

export const clearBreadcrumb = () => ({
    type: ACTION_BREADCRUMB.CLEAR_BREADCRUMB,
    payload: {
        title: 'Home',
        breadcrumbItems: []
    }
});
