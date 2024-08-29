import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getCategoryOptions } from '@/components/safe-apps/SafeAppsFilters'
import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'

const useCategoryFilter = ({
  safeAppsList,
  selectedCategories,
  setSelectedCategories,
}: {
  safeAppsList: SafeAppData[]
  selectedCategories: string[]
  setSelectedCategories: Dispatch<SetStateAction<string[]>>
}) => {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const categoryOptions = getCategoryOptions(safeAppsList).map((category) => category.value)
    const categoryQuery = Array.isArray(params.categories) ? params.categories[0] : params.categories

    if (categoryQuery && selectedCategories.length === 0) {
      const categoryQueryOptions = categoryQuery.split(',')
      const isCategoryOption = categoryQueryOptions.every((category) => categoryOptions.includes(category))

      if (!isCategoryOption) return

      setSelectedCategories(categoryQueryOptions)
    }
  }, [params.categories, safeAppsList, selectedCategories.length, setSelectedCategories])

  const onSelectCategories = async (selectedCategories: string[]) => {
    const { categories, ...restProps } = params

    // await router.push(
    //   {
    //     pathname: router.pathname,
    //     query:
    //       selectedCategories.length === 0 ? restProps : { ...router.query, categories: selectedCategories.join(',') },
    //   },
    //   undefined,
    //   {
    //     shallow: true,
    //   },
    // )

    setSelectedCategories(selectedCategories)
  }

  return { onSelectCategories }
}

export default useCategoryFilter
