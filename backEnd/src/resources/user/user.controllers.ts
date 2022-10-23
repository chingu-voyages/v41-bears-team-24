import prisma from "../../prismaClient"
import { Request, Response} from 'express';

export const updateUser = async (req: Request, res: Response) => {
    const { id, firstName, lastName, role } = req.body

    let user
    
    try {
        user = await prisma.user.update({
            where: { id: id },
            data: {
                firstName: firstName,
                lastName: lastName,
                role: role
            }
        })

        res.status(200).json({ message: 'User updated successfully' })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}