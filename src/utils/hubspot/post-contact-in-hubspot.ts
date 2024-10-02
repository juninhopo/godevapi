import axios from "axios"
import { Contact } from "./create-contact-in-hubspot"

const putContactInHubSpot = async (data: Contact) => {
  try {
    console.log({
      message: 'Uploading contact to HubSpot',
    })

    await axios.post(
      `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
      {
        "properties": {
          email: data.email,
          firstname: data.name,
          phone: data.phone,
          company: data.company,
          website: data.site,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        }
      },
    )
  } catch (error: any) {
    console.error({
      message: 'Error on put contact in HubSpot',
      error,
    })
  }
}

export default putContactInHubSpot