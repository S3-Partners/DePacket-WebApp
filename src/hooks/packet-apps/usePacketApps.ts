import { useEffect, useMemo } from 'react'
import type { SafeAppsTag } from '@/config/constants'

import fs from 'fs'
import path from 'path'
import { PackgData } from '@/types/packgeModelList'

const usePacketApps = (tag?: SafeAppsTag): PackgData[] => {
  let idCounter = 1
  // const files = [];
  // return files.map((file) => {
  //   const fileNameWithoutExt = path.parse(file).name
  //   return {
  //     id: idCounter++,
  //     url: `${baseUrl}/${file}`,
  //     name: fileNameWithoutExt,
  //     iconUrl: `${baseUrl}/${file}`,
  //     description: `${fileNameWithoutExt} description`,
  //   }
  // })
  return []
}

export { usePacketApps }
