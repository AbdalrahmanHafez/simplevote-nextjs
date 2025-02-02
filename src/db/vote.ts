import prisma from "./prisma"

export const createVoteAndUser = (pollid: string, choiceid: number) => {
	return prisma.vote.create({
		data: {
			choice: { connect: { id: choiceid } },
			user: { create: {} },
			poll: { connect: { id: pollid } }
		},
		include: {
			choice: true,
			user: true,
			poll: true,
		},
	});
}

export const createVote = (userid: number, pollid: string, choiceid: number) => {
	return prisma.vote.create({
		data: {
			choice: { connect: { id: choiceid } },
			user: { connect: { id: userid } },
			poll: { connect: { id: pollid } }
		},
		include: {
			choice: true,
			user: true,
			poll: true,
		},
	});
}

