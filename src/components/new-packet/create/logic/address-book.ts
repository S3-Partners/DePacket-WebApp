import type { AppThunk } from '@/store'
import { addOrUpdateSafe } from '@/store/slices/addedSafesSlice'
import { upsertAddressBookEntry } from '@/store/slices/addressBookSlice'
import { defaultSafeInfo } from '@/store/slices/safeInfoSlice'
import type { NamedAddress } from '@/components/new-packet/create/types'

export const updateAddressBook = (
  chainId: string,
  address: string,
  name: string,
  owners: NamedAddress[],
  threshold: number,
): AppThunk => {
  return (dispatch) => {
    dispatch(
      upsertAddressBookEntry({
        chainId,
        address,
        name,
      }),
    )

    owners.forEach((owner) => {
      const entryName = owner.name || owner.ens
      if (entryName) {
        dispatch(upsertAddressBookEntry({ chainId, address: owner.address, name: entryName }))
      }
    })

    dispatch(
      addOrUpdateSafe({
        safe: {
          ...defaultSafeInfo,
          address: { value: address, name },
          threshold,
          owners: owners.map((owner) => ({
            value: owner.address,
            name: owner.name || owner.ens,
          })),
          chainId,
          nonce: 0,
        },
      }),
    )
  }
}
