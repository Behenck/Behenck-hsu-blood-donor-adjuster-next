import { Prisma } from '@prisma/client'
import { prisma } from "../../../prisma";
import xl from "excel4node"

// interface ResponseSQL {
//   nrDistribuicao: number
//   codHemocomp: string
//   descHemocomp: string
//   grupoABO: string
//   fatorRH: string
//   paciente: string
//   prontuario: string
//   dataSaida: string
// }

export default async function handler(request, response) {
  const { month, year } = request.body

  const dateFirst = new Date(`${year}-${month}-01`);
  const dateLast = new Date(Number(year), Number(month), 0);

  const responseSqlToHemoloc = await prisma.$queryRaw(
    Prisma.sql`SELECT
    dpac.nrdistrib AS 'nrDistribuicao',
    dpac.hemocomp AS 'codHemocomp',
    dpac.hemosolicitado AS 'descHemocomp',
    dpac.grupoabo AS 'grupoABO',
    dpac.fatorrh AS 'fatorRH',
    dnr.paciente AS 'paciente',
    dnr.prontuario 'prontuario',
    CONVERT (VARCHAR, dnr.dtsaida, 103) AS 'dataSaida'
  --	dnr.dtsaida
  FROM 
    dstpacat dpac, 
    dstpacnr dnr
  WHERE 
        dpac.nrdistrib	=	dnr.nrdistrib
    AND	(dnr.dtsaida BETWEEN ${dateFirst} AND ${dateLast})
  ORDER BY dpac.nrdistrib`
  )

  const responseFormatted = responseSqlToHemoloc.map(res => {
    return {
      ...res,
      nrDistribuicao: String(res.nrDistribuicao)
    }
  })

  const wb = new xl.Workbook()
  
  const ws = wb.addWorksheet(`${month}-${year}`)

  const titulos = [
    'Nr Distriuição',
    'Cod. Hemocomp.',
    'Desc. Hemocomp.',
    'Grupo ABO',
    'Fator RH',
    'Paciente',
    'Prontuário',
    'Data de Saída'
  ]

  let headingColumnIndex = 1
  titulos.forEach(titulo => {
    ws.cell(1, headingColumnIndex++).string(titulo)
  })

  let rowIndex = 2;
  responseFormatted.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach(columnName => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName])
    })
    rowIndex++;
  })

  wb.write(`relatorio-banco-de-sangue-${month}-${year}.xlsx`, response)  
}