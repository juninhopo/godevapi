import downloadCsv from "./utils/download-csv"
import createContactInHubSpot from "./utils/hubspot/create-contact-in-hubspot"
import dotenv from "dotenv"

dotenv.config()

const exportContactsToHubSpot = async () => {
  console.log({
    message: 'Init flow export contacts to HubSpot',
  })

  // Download contact database
  const sheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVC422UOImroDdofLp7bKRniftvfEV8p1E9FoOm5Fc7ysWA4yQa0UMhSw6WUj7vblQml7ZuxtXnmKY/pub?output=csv'
  const contact_data = await downloadCsv(sheet_url)

  // Validate if contact data is empty
  if(!contact_data) {
    console.error({
      message: 'Contact data is empty',
    })
    return 
  }

  // Create a for to upload contact one by one
  for (const contact of contact_data) {
    console.log({
      message: 'Uploading contact to HubSpot',
    })

    await createContactInHubSpot({
      company: contact.company,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      site: contact.site,
    })
  } 
}

exportContactsToHubSpot()

export default exportContactsToHubSpot
