import prisma from "./prisma"

export const getPollsByUser = (userid: number) => {
	return prisma.poll.findMany({ where: { userId: userid } })
}

export const getPollWithChoices = (pollid: string) => {
	return prisma.poll.findUnique({
		where: { id: pollid },
		include: { choices: true }
	})
}

export const createPoll = (userid: number, title: string, options: string[]) => {
	return prisma.poll.create({
		data: {
			title,
			choices: {
				create: options.map((optionText) => ({ optionText })),
			},
			user: {
				connect: { id: userid }
			},
		}
	});
}


export const createPollAndUser = (title: string, options: string[]) => {
	return prisma.poll.create({
		data: {
			title,
			choices: {
				create: options.map((optionText) => ({ optionText })),
			},
			user: {
				create: {},
			},
		},
		include: {
			choices: true,
			user: true,
		},
	});
}


export const getPollResults = (id: string) => {
	return prisma.poll.findUnique({
		where: { id },
		include: {
			choices: {
				include: {
					votes: true
				}
			}
		}
	})
}

export const deletePoll = (where: { id: string, userId: number }) => prisma.poll.delete({ where: where })
