import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store'

export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector
