import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

const adapter = new PrismaD1(getRequestContext().env.DB)
const prisma = new PrismaClient({ adapter })

const createInitialEmployes = () => {
    return new Promise(async(resolve, reject) => {
        try {
            await prisma.empleado.create({
                data: {
                    name: "Rafael",
                    email: "rafael@gmail.com",
                    photo: "photo.jpg"
                }
            })

            resolve("Executed seed")
        } catch (error) {
            reject(error)
        }
    })
}

createInitialEmployes().then(async(value) => {
    console.log(value)
    await prisma.$disconnect()
}).catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
})