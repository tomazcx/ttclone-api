export abstract class User {
	name: string
	email: string
	user: string
	image?: string
	banner?: string
	localization?: string
	desc?: string
	created_at: Date

	followers?: User[]
	following?: User[]
}
