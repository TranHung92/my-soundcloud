import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { tracksReducer } from './tracks'
import { usersReducer } from './users'
import { tracklistsReducer } from './tracklists'

export default combineReducers({
  auth: authReducer,
  tracks: tracksReducer,
  users: usersReducer,
  tracklists: tracklistsReducer,
});
