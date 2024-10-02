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
  // Validate if contact is corporative email
  validateCorporativeEmail(data.email)

  // Validate if contact is already in HubSpot 
  const is_contact = await validateAlreadyContact(data.email)

  // Upload contact to HubSpot
  if (!is_contact) {
    await putContactInHubSpot(data)
  } else {
    console.log({
      message: 'Contact already in HubSpot',
    })

    return
  }
}

export default createContactInHubSpot