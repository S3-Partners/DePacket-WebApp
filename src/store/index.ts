import { configureStore, createListenerMiddleware, Middleware, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { IS_PRODUCTION } from '@/config/constants'
import { getPreloadedState, persistState } from './persistStore'
import * as slices from './slices'
import * as hydrate from './useHydrateStore'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import merge from 'lodash/merge'
import { broadcastState, listenToBroadcast } from './broadcast'
import { txQueueListener } from './slices/txQueueSlice'

const persistedSlices: (keyof Partial<RootState>)[] = [slices.sessionSlice.name, slices.settingsSlice.name]

export const getPersistedState = () => {
  return getPreloadedState(persistedSlices)
}

export const listenerMiddlewareInstance = createListenerMiddleware<RootState>()

const middleware: Middleware[] = [
  persistState(persistedSlices),
  broadcastState(persistedSlices),
  listenerMiddlewareInstance.middleware,
  // ofacApi.middleware,
]

const listeners = [txQueueListener]

export const _hydrationReducer: typeof rootReducer = (state, action) => {
  if (action.type === hydrate.HYDRATE_ACTION) {
    /**
     * When changing the schema of a Redux slice, previously stored data in LS might become incompatible.
     * To avoid this, we should always migrate the data on a case-by-case basis in the corresponding slice.
     * However, as a catch-all measure, we attempt to merge the stored data with the initial Redux state,
     * so that any newly added properties in the initial state are preserved, and existing properties are taken from the LS.
     *
     * @see https://lodash.com/docs/4.17.15#merge
     */
    return merge({}, state, action.payload) as RootState
  }
  return rootReducer(state, action) as RootState
}

export const makeStore = (initialState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: _hydrationReducer,
    middleware: (getDefaultMiddleware) => {
      listeners.forEach((listener) => listener(listenerMiddlewareInstance))
      return getDefaultMiddleware({ serializableCheck: false }).concat(middleware)
    },
    devTools: !IS_PRODUCTION,
    preloadedState: initialState,
  })

  listenToBroadcast(store)

  return store
}

// Define RootState and AppDispatch
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useHydrateStore = hydrate.useHydrateStore
