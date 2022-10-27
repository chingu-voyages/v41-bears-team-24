import prisma from "../src/prismaClient";
import { defaultUsers, menuCategories, menuItems } from './seedData'
import bcrypt from 'bcrypt'

async function main() {
    const salt = bcrypt.genSaltSync()
    // users
    await Promise.all(defaultUsers.map( async (user) => {
        return prisma.user.create({
            data: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                password: bcrypt.hashSync(user.password, salt),
                role: 'EMPLOYEE'
            }
        })
    }))

    // menu categories
    await Promise.all(menuCategories.map( async (menuCategory) => {
        return prisma.menuCategory.create({
            data: {
                name: menuCategory.name
            }
        })
    }))

    // menu items and connecting them to the proper categories
    await Promise.all(menuItems.map( async (item) => {
        return prisma.menuItem.create({
            data: {
                name: item.name,
                price: item.price,
                calorieCount: item.calorieCount,
                ingredients: item.ingredients,
                description: item.description,
                imageUrl: item.imageUrl,
                category: {
                    connect: { name: item.belongsTo }
                }
            },
        })
    }))

  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
