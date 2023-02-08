import { NextApiRequest, NextApiResponse  } from "next";
import { Prisma } from '@prisma/client'
import { AnyZodObject, z } from 'zod'
import { prisma } from "../../../prisma";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { donor } = request.body

  const res = await prisma.$queryRaw(
    Prisma.sql`SELECT registro, doador, sexo FROM doador WHERE registro=${donor}`
  )

  response.status(200).json(res)
}