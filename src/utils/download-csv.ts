import axios from "axios"
import Papa from "papaparse"

const downloadCsv = async (sheetUrl: string) => {
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

  console.log({
    message: 'Download csv',
    parsedData: parsedData.data,
  })

  return parsedData.data

  } catch (error) {
    console.error({
      message: 'Error on download csv',
      error,
    })
  }
}

export default downloadCsv