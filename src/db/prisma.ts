import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
	const prisma = new PrismaClient({
		log: [
			{
				emit: 'event',
				level: 'query',
			},
			{
				emit: 'stdout',
				level: 'error',
			},
			{
				emit: 'stdout',
				level: 'info',
			},
			{
				emit: 'stdout',
				level: 'warn',
			},
		],
	})

	prisma.$on('query', (e) => {
		console.log('Query: ' + e.query)
		console.log('Params: ' + e.params)
		console.log('Duration: ' + e.duration + 'ms')
	})

	return prisma
}

declare global {
	// eslint-disable-next-line no-var
	var __prisma__: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.__prisma__ ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.__prisma__ = prisma
