import { useAppSelector } from '@/store'
import { selectAllAddressBooks } from '@/store/slices/addressBookSlice'

const useAllAddressBooks = () => {
  return useAppSelector(selectAllAddressBooks)
}

export default useAllAddressBooks
