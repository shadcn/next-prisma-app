import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(502).end()
  }

  try {
    const message = await db.message.create({
      data: {
        content: req.body.message,
      },
    })

    if (!message?.id) {
      throw new Error("Message not created!")
    }

    return res.status(201).end()
  } catch (error) {
    return res.status(422).end(error.message)
  }
}
