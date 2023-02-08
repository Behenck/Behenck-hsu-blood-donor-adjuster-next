import { toast, Toaster } from "react-hot-toast"
import { AdjusterForm, Button, Copyright, Form, FormControl, Input, Select, Main, Window } from '../../styles/stylesRelatorio'
import Image from 'next/image'
import WomanBloodBankImage from '../../assets/image.jpg'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import fileDownload from "js-file-download"
import axios from "axios"
import { useState } from "react"
import { Loading } from "@/components/Loading"

const GenerateReportFormSchema = z.object({
  year: z.string(),
  month: z.string(),
})

type GenerateReportFormInputs = z.infer<typeof GenerateReportFormSchema>

export default function Relatorio() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<GenerateReportFormInputs>({
    resolver: zodResolver(GenerateReportFormSchema),
  })

  async function handleGenerateReport(data: GenerateReportFormInputs) {
    setIsLoading(true)
    const { year, month } = data
    let filename = "bancoDeSangue.xlsx"
    try {
      await axios({
        url: "/api/findByMonthToDonor",
        method: "POST",
        responseType: 'blob',
        data: {
          year,
          month,
        },
      }).then((response) => {
        var disposition = response.headers['content-disposition'];
        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) { 
            filename = matches[1].replace(/['"]/g, '');
          }
      }     
        setIsLoading(false)
        reset()
        fileDownload(response.data, filename)
      })
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      toast.error("Não foi possível gerar o relatório!")
    } finally {
      toast.success("Relatório gerado com sucesso!")
    }
  }
  const date = new Date()

  return (
    <Main>
      <Toaster />
      <Window>
        <div>
          <Image src={WomanBloodBankImage} alt="image" width={500} height={500} />
        </div>
        <AdjusterForm>
          <h1>Relatório Mensal</h1>

          <Form onSubmit={handleSubmit(handleGenerateReport)}>
            <FormControl>
              <label htmlFor="month">Mês</label>
              <Select defaultValue={"DEFAULT"} id="month" {...register("month")}>
                <option disabled selected value="DEFAULT">-- Selecione --</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </Select>
            </FormControl>

            <FormControl>
              <label htmlFor="year">Ano</label>
              <Select defaultValue={date.getFullYear()} id="year" {...register("year")}>
                <option value={date.getFullYear() - 1}>{date.getFullYear() - 1}</option>
                <option value={date.getFullYear()} selected>{date.getFullYear()}</option>
              </Select>
            </FormControl>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loading /> : "Gerar"}
            </Button>
          </Form>
        </AdjusterForm>
      </Window>

      <Copyright>
        <p>Copyright © 2023 • Denilson Behenck • Todos os direitos reservados</p>
      </Copyright>
    </Main>
  )
}