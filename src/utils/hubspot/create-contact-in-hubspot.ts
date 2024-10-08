import validateAlreadyContact from "./validate-already-contact"
import validateCorporativeEmail from "../validate-corporative-email"
import putContactInHubSpot from "./post-contact-in-hubspot"

export type Contact = {
  company: string
  name: string
  email: string
  phone: string
  site: string
}

const createContactInHubSpot = async (data: Contact) => {
  validateCorporativeEmail(data.email)

  const is_contact = await validateAlreadyContact(data.email)

  if (!is_contact) {
    await putContactInHubSpot(data)

    return
  } else {
    console.log({
      message: 'Contact already in HubSpot',
    })

    return
  }
}

export default createContactInHubSpot