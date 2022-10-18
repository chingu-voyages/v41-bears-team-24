import prisma from "../client"

export const updateUser = async (req: any, res: any) => {
    const { username, firstName, lastName, role } = req.body.username

    let user

    try {
        user = await prisma.user.update({
            where: {
                username: username
            },
            data: {
                update: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    role: role
                }
            }
        })

        res.status(200).json({ message: 'User updated successfully'})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}