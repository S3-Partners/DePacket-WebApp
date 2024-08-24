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
})

export default rootReducer
