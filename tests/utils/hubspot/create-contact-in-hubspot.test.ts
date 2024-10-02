import createContactInHubSpot from "../../../src/utils/hubspot/create-contact-in-hubspot"
import putContactInHubSpot from "../../../src/utils/hubspot/post-contact-in-hubspot"
import validateAlreadyContact from "../../../src/utils/hubspot/validate-already-contact"
import validateCorporativeEmail from "../../../src/utils/validate-corporative-email"

jest.mock('../../../src/utils/validate-corporative-email')
jest.mock('../../../src/utils/hubspot/validate-already-contact')
jest.mock('../../../src/utils/hubspot/post-contact-in-hubspot')

describe('SRC - Utils - HubsSpot - Create Contact In HubSpot', () => {
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validateCorporativeEmailMock = jest.mocked(validateCorporativeEmail)
  const validateAlreadyContactMock = jest.mocked(validateAlreadyContact)
  const putContactInHubSpotMock = jest.mocked(putContactInHubSpot)

  it('should execute put in HubSpot if contact does not exist', async () => {
    // Arrange
    const data_mock = {
      company: 'Company Mock',
      name: 'Name Mock',
      email: 'email@mock.com',
      phone: '123456789',
      site: 'https://mock.com',
    }

    validateCorporativeEmailMock.mockReturnValue(false)
    validateAlreadyContactMock.mockResolvedValue(false)
    putContactInHubSpotMock.mockResolvedValue(undefined)

    // Act
    const result = await createContactInHubSpot(data_mock)

    // Assert
    expect(result).toStrictEqual(undefined)

    expect(validateCorporativeEmailMock).toHaveBeenCalledTimes(1)
    expect(validateCorporativeEmailMock).toHaveBeenCalledWith(data_mock.email)
    
    expect(validateAlreadyContactMock).toHaveBeenCalledTimes(1)
    expect(validateAlreadyContactMock).toHaveBeenCalledWith(data_mock.email)

    expect(putContactInHubSpotMock).toHaveBeenCalledTimes(1)
    expect(putContactInHubSpotMock).toHaveBeenCalledWith(data_mock)
  })

  it('should not execute put in HubSpot if contact already exists', async () => {
    // Arrange
    const data_mock = {
      company: 'Company Mock',
      name: 'Name Mock',
      email: 'email@mock.com',
      phone: '123456789',
      site: 'https://mock.com',
    }

    validateCorporativeEmailMock.mockReturnValue(false)
    validateAlreadyContactMock.mockResolvedValue(true)

    // Act
    const result = await createContactInHubSpot(data_mock)

    // Assert
    expect(result).toStrictEqual(undefined)
    expect(validateCorporativeEmailMock).toHaveBeenCalledTimes(1)
    expect(validateCorporativeEmailMock).toHaveBeenCalledWith(data_mock.email)
    expect(validateAlreadyContactMock).toHaveBeenCalledTimes(1)
    expect(validateAlreadyContactMock).toHaveBeenCalledWith(data_mock.email)
    expect(putContactInHubSpotMock).not.toHaveBeenCalled()
  })
})