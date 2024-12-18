import { combineReducers } from 'redux';

import breadcrumbs from './breadcrumbs.reducer';
import auth from './auth.reducer';

const allReducers = combineReducers({
    breadcrumbs,
    auth
});

export default allReducers;
