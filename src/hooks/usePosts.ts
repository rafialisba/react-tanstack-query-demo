import { useQuery } from '@tanstack/react-query'
import type { Post } from '../types'

export const usePosts = (page: number) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: async (): Promise<Post[]> => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    },
  })
}
