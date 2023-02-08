import { NextApiRequest, NextApiResponse  } from "next";
import { Prisma } from '@prisma/client'
import { AnyZodObject, z } from 'zod'
import { prisma } from "../../../prisma";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { donor, genre  } = request.body

  try {
    let ndias

    if (genre === 'M') {
      ndias = 62
    } else  if (genre === 'F') {
      ndias = 65
    } else {
      throw new Error
    }

    await prisma.$queryRaw(
      Prisma.sql`UPDATE suspenso SET ndias=${ndias} WHERE doador=${donor}`
    )

    return response.json({
      message: 'Sucesso',
    })
  } catch (err) {
    console.log(err)
    return response.status(404)
  }
}