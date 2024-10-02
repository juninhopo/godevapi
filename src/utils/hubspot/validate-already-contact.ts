import axios from "axios"

const validateAlreadyContact = async (email: string) => {
  try {
    await axios.get(
      `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${email}?idProperty=email`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        }
      }
    )

    console.log({
      message: 'Contact already in HubSpot',
      is_contact: true,
    })

    return true
  } catch (error: any) {
    if(error.response?.status === 404) {
      console.log({
        message: 'Contact not found in HubSpot',
        is_contact: false,
      })

      return false
    } else {
      console.error({
        message: 'Error on validate already contact',
        error,
      })
    }
  }
}

export default validateAlreadyContact