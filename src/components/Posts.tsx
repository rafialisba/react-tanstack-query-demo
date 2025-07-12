import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'

export default function Posts() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error, isFetching } = usePosts(page)

  if (isLoading)
    return <p className="text-gray-500 text-center mt-8">Loading...</p>

  if (isError)
    return (
      <p className="text-red-500 text-center mt-8">
        Error: {error.message}
      </p>
    )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Posts - Page {page}
      </h1>

      {isFetching && (
        <p className="text-sm text-gray-400 text-center mb-2">Refreshing data...</p>
      )}

      <ul className="space-y-4">
        {data?.map((post) => (
          <li key={post.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data?.length === 0 || (data && data.length < 10)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}
