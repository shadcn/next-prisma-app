import { MessageForm } from "@/components/message-form"
import { db } from "@/lib/db"

export const revalidate = 0
// export const dynamic = "force-dynamic"

export default async function Page() {
  const messages = await db.message.findMany()

  return (
    <div className="mx-auto max-w-xl py-12">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl">
        New Post
      </h1>
      <MessageForm />
      <hr className="my-8" />
      <div className="grid gap-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className="rounded-md bg-blue-400 px-2 py-1 text-white"
          >
            {message.content}
          </div>
        ))}
      </div>
    </div>
  )
}
