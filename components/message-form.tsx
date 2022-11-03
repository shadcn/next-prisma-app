"use client"

import { useRouter } from "next/navigation"
import * as React from "react"

export function MessageForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    setIsLoading(true)
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: data.get("message"),
      }),
    })

    setIsLoading(false)
    if (!response?.ok) {
      return alert(response.statusText)
    }

    return router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start space-y-4">
      <div className="grid w-full gap-2">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Leave a comment..."
          disabled={isLoading}
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-25 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  )
}
