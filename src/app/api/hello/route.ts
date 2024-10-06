import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const adapter = new PrismaD1(getRequestContext().env.DB)
    const prisma = new PrismaClient({ adapter })

    const registers = await prisma.empleado.findMany();
    
    return new Response(JSON.stringify(registers), {
      headers: {
        "Content-Type": "application/json"
      }
    })
} catch (error) {
    return new Response("Error")
}
}
