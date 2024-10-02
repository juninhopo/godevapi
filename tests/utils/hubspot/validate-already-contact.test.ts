import axios from "axios"
import validateAlreadyContact from "../../../src/utils/hubspot/validate-already-contact"

jest.mock('axios')

describe('SRC - Utils - HubsSpot - Validate Already Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.HUBSPOT_BASE_URL = 'https://api.hubapi.com'
    process.env.HUBSPOT_API_KEY = 'your_api_key'
  })

  const axios_mock = jest.mocked(axios)

  it('should return true if user is already contact in HubSpot', async () => {
    // Arrange
    const params_mock = 'test@test.com'

    axios_mock.get.mockResolvedValue({ data: true })

    // Act
    const result = await validateAlreadyContact(params_mock)

    // Assert
    expect(result).toBe(true)

    expect(axios_mock.get).toHaveBeenCalledTimes(1)
    expect(axios_mock.get).toHaveBeenCalledWith(
      `https://api.hubapi.com/crm/v3/objects/contacts/${params_mock}?idProperty=email`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        }
      }
    )
  })

  it('should return false if user not exist in HubSpot', async () => {
    // Arrange
    const params_mock = 'test@test.com'

    axios_mock.get.mockRejectedValue({
      response: {
        status: 404,
        data: 'Not Found'
      }
    })

    // Act
    const result = await validateAlreadyContact(params_mock)

    // Assert
    expect(result).toStrictEqual(false)

    expect(axios_mock.get).toHaveBeenCalledTimes(1)
    expect(axios_mock.get).toHaveBeenCalledWith(
      `https://api.hubapi.com/crm/v3/objects/contacts/${params_mock}?idProperty=email`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        }
      }
    )
  })

  it('should log error if there is an error other than 404', async () => {
    // Arrange
    const email = 'test@test.com'
    const error = new Error('Network Error')
    
    axios_mock.get.mockRejectedValue(error)
    console.error = jest.fn()

    // Act
    await validateAlreadyContact(email)

    // Assert
    expect(console.error).toHaveBeenCalledWith({
      message: 'Error on validate already contact',
      error,
    })
  })
})