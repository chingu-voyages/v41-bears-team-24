import prisma from "../../prismaClient"
import { Request, Response} from 'express';

export const getUser = async (req: Request, res: Response) => {
    // check for valid JWT
    const { id } = req.body

    let user 

    try {
        user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        res.status(200).json({ data: user })
    } catch (e) {
        res.status(404).json({ error: 'User does not exist'})
    }
}


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