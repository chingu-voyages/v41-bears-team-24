import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import prisma from '../client'

const createNewToken = (user: any) => {
    jwt.sign(
            {id: user.id, role: user.role, username: user.username}, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRATION })
}


export const signup = async (req: any, res: any) => {
    const salt = bcrypt.genSaltSync()

    const { username, password, firstName, lastName, role } = req.body

    if (!username || !password) res.status(400).send({ message: 'usernamne and password are required' })

    let user

    try {
        user = await prisma.user.create({
            data: {
                username: username,
                password: bcrypt.hashSync(password, salt),
                firstName: firstName,
                lastName: lastName,
                role: role
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(400).end()
    }

    const token = createNewToken(user)

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('ORDER_UP_TOKEN', token, {
            httpOnly: true,
            // 8 hours
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
    )

    res.json(user)    
}

export const signin = async (req: any, res: any) => {
    const { username, password } = req.body

    if (!username || !password) res.status(400).send({ message: 'usernamne and password are required' })

    let user

    try {
        user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: 'Account does not exist'})
    }

    if (bcrypt.compareSync(password, user.password)) {
        const token = createNewToken(user)

        res.setHeader(
            'Set-Cookie',
            cookie.serialize('ORDER_UP_TOKEN', token, {
                httpOnly: true,
                // 8 hours
                maxAge: 8 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            })
        ) 
        
        res.json(user)

    } else {
        res.status(401)
        res.json({ error: 'Email or Password is incorrect' })
    }


}