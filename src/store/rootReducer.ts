import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import * as slices from './slices'

const rootReducer = combineReducers({
  user: userReducer,
  [slices.chainsSlice.name]: slices.chainsSlice.reducer,
  [slices.settingsSlice.name]: slices.settingsSlice.reducer,
  [slices.sessionSlice.name]: slices.sessionSlice.reducer,
  [slices.addressBookSlice.name]: slices.addressBookSlice.reducer,
  [slices.safeInfoSlice.name]: slices.safeInfoSlice.reducer,
  [slices.addedSafesSlice.name]: slices.addedSafesSlice.reducer,
  [slices.pendingTxsSlice.name]: slices.pendingTxsSlice.reducer,
  [slices.notificationsSlice.name]: slices.notificationsSlice.reducer,
  [slices.undeployedSafesSlice.name]: slices.undeployedSafesSlice.reducer,
  [slices.safeAppsSlice.name]: slices.safeAppsSlice.reducer,
})

export default rootReducer
