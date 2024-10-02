import axios from 'axios'
import postContactInHubSpot from '../../../src/utils/hubspot/post-contact-in-hubspot'

jest.mock('axios')

describe('SRC - Utils - HubSpot - Post Contact In HubSpot', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.HUBSPOT_BASE_URL = 'https://api.hubapi.com'
    process.env.HUBSPOT_API_KEY = 'your_api_key'
  })

  const axios_mock = jest.mocked(axios)

  it('should successfully create a contact in HubSpot', async () => {
    // Arrange
    const contact_data = { 
      email: 'test@mock.com', 
      name: 'FistNameMock', 
      company: 'Company Mock',
      phone: '123456789',
      site: 'https://mock.com',
    }

    axios_mock.post.mockResolvedValue({ data: { id: '12345' } })

    // Act
    const result = await postContactInHubSpot(contact_data)

    // Assert
    expect(result).toBe(undefined)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        "properties": {
          email: contact_data.email,
          firstname: contact_data.name,
          phone: contact_data.phone,
          company: contact_data.company,
          website: contact_data.site,
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    )
  })

  it('should log the error if it fails to create the contact in HubSpot', async () => {
    // Arrange
    const contact_data = { 
      email: 'test@mock.com', 
      name: 'FistNameMock', 
      company: 'Company Mock',
      phone: '123456789',
      site: 'https://mock.com',
    }

    axios_mock.post.mockRejectedValue(new Error('Network Error'))

    // Act
    const result = await postContactInHubSpot(contact_data)

    // Assert
    expect(result).toBe(undefined)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        "properties": {
          email: contact_data.email,
          firstname: contact_data.name,
          phone: contact_data.phone,
          company: contact_data.company,
          website: contact_data.site,
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    )
  })

  it('should log error if there is an error other than network error', async () => {
    // Arrange
    const contact_data = { 
      email: 'test@mock.com', 
      name: 'FistNameMock', 
      company: 'Company Mock',
      phone: '123456789',
      site: 'https://mock.com',
    }
    const error = new Error('Server Error')

    axios_mock.post.mockRejectedValue(error)
    console.error = jest.fn()
    
    // Act
    await postContactInHubSpot(contact_data)

    // Assert
    expect(console.error).toHaveBeenCalledWith({
      message: 'Error on put contact in HubSpot',
      error,
    })
  })
})