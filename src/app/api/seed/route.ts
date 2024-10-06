import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {

    if(process.env.NODE_ENV === "production"){
        return new Response("Error")
    }

    try {
        const adapter = new PrismaD1(getRequestContext().env.DB)
        const prisma = new PrismaClient({ adapter })

        await prisma.empleado.create({
            data: {
                name: "Rafael",
                email: "rafael@gmail.com",
                photo: "photo.jpg"
            }
        })
        
        return new Response("Ok")
    } catch (error) {
        return new Response("Error")
    }
}
