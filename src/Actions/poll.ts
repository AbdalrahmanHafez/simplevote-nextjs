'use server'
import { createPoll, createPollAndUser, deletePoll, getPollResults, getPollsByUser } from "@/db/poll";
import { createVote, createVoteAndUser } from "@/db/vote";
import { getSessionData, setSession } from "@/utils";
import { Poll, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { forbidden, notFound, redirect, } from "next/navigation"



export const createPoll_Action = async (prevState: unknown, data: { title: string, options: string[] }) => {
	// console.log("[ACTION] createPoll_Action:  Raw data ", data)
	const { title, options } = data
	if (!title || !options || options.length < 2) return notFound()


	let createdPoll: Poll | null = null;
	const userSession = await getSessionData();
	if (userSession) {
		const { userid } = userSession as { userid: number }
		createdPoll = await createPoll(userid, title, options)
	} else {
		createdPoll = await createPollAndUser(title, options)
		setSession({ userid: createdPoll.userId })
	}

	revalidatePath('/poll/mine')

	return redirect(`/poll/${createdPoll.id}`)
};

export const votePoll_Action = async (prevState: unknown, data: { pollid: string, choiceid: string }) => {
	console.log("[ACTION] votePoll_Action:  Raw data ", data)

	const { pollid, choiceid } = data

	const choiceIdNumber = Number(choiceid)
	if (isNaN(choiceIdNumber)) return notFound()

	const userSession = await getSessionData();
	if (userSession) {
		const { userid } = userSession as { userid: number }
		try {
			await createVote(userid, pollid, choiceIdNumber)
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === "P2002")
				return { error: "User already voted" }
		}
	} else {
		const vote = await createVoteAndUser(pollid, choiceIdNumber)
		setSession({ userid: vote.user.id })
	}

	revalidatePath(`/poll/${pollid}/results`)
	return { success: "Vote submitted" }
}

export const getPollResults_Action = async (pollid: string) => {
	const results = (await getPollResults(pollid))!
	return results.choices.map(c => ({ "id": c.id, "optionText": c.optionText, "votes": c.votes?.length | 0 }))
}

export const getUserPolls_Action = async () => {
	const userSession = await getSessionData();
	if (!userSession) return []

	const { userid } = userSession as { userid: number }

	const userPolls = await getPollsByUser(userid)
	return userPolls.map(p => ({ "id": p.id, "title": p.title }))
}


export const deletePoll_Action = async (pollid: string) => {
	const userSession = await getSessionData();
	if (!userSession) return forbidden()

	const { userid } = userSession as { userid: number }

	try {
		await deletePoll({
			id: pollid,
			userId: userid
		})
	} catch (error) {
		// Handle "Record not found" (no poll or unauthorized)
		if (error instanceof Prisma.PrismaClientKnownRequestError
			&& error.code === 'P2025'
		) return notFound();
	}

	revalidatePath('/poll/mine')
	revalidatePath('/poll/' + pollid)

	return redirect("/poll/mine/");
}