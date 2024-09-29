"use server"

import { auth } from "@/auth"
import { getUserById } from "@/data/user"
import { sendRequest } from "@/lib/request"
import { revalidatePath } from "next/cache"

export const friendRequest = async (senderId: string, receiverId: string) => {
    const session = await auth()

    if (!session) return { error: "Not authorized" }

    const sender = getUserById(senderId)
    const receiver = getUserById(receiverId)

    if (!sender || !receiver) return { error: "Something went wrong" }

    await sendRequest(senderId, receiverId)

    revalidatePath('/home')

    return { success: "Request sent" }
}