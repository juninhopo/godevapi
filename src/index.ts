import downloadCsv from "./utils/download-csv"
import createContactInHubSpot from "./utils/hubspot/create-contact-in-hubspot"
import dotenv from "dotenv"

dotenv.config()

const exportContactsToHubSpot = async () => {
  console.log({
    message: 'Init flow export contacts to HubSpot',
  })

  const sheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVC422UOImroDdofLp7bKRniftvfEV8p1E9FoOm5Fc7ysWA4yQa0UMhSw6WUj7vblQml7ZuxtXnmKY/pub?output=csv'
  const contact_data = await downloadCsv(sheet_url)

  if(!contact_data) {
    console.error({
      message: 'Contact data is empty',
    })
    return 
  }

  for (const contact of contact_data) {
    console.log({
      message: 'Uploading contact to HubSpot',
    })

    try {
      await createContactInHubSpot({ company: contact.company,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        site: contact.site,
      })
    } catch (error) {
      console.error({
        message: 'Error on create contact in HubSpot',
        error,
      })
    }
  } 
}

exportContactsToHubSpot()

export default exportContactsToHubSpot
