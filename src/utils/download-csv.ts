import axios from "axios"
import Papa from "papaparse"
import { Contact } from "./hubspot/create-contact-in-hubspot"

const downloadCsv = async (sheetUrl: string): Promise<Contact[] | undefined>=> {
  console.log({
    message: 'Init flow download csv',
  })

  try {
  const response = await axios.get(sheetUrl)

  const csvData = response.data

  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  })

  if(!parsedData) {
    console.error({
      message: 'Error downloading contact data',
    })
    return undefined
  }

  console.log({
    message: 'Finish download csv',
  })

  return parsedData.data as Contact[]

  } catch (error) {
    console.error({
      message: 'Error on download csv',
      error,
    })
  }
}

export default downloadCsv