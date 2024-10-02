import exportContactsToHubSpot from '../src/index'
import downloadCsv from '../src/utils/download-csv'
import createContactInHubSpot from '../src/utils/hubspot/create-contact-in-hubspot'

jest.mock('../src/utils/download-csv')
jest.mock('../src/utils/hubspot/create-contact-in-hubspot')

describe('SRC - Index', () => {
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const downloadCsvMock = jest.mocked(downloadCsv)
  const createContactInHubSpotMock = jest.mocked(createContactInHubSpot)

  it('should create the contact list in HubSpot', async () => {
    // Arrange
    const contact_data_mock = [
      {
      email: 'test@mock.com', 
      name: 'FistNameMock', 
      company: 'Company Mock',
      phone: '123456789',
      site: 'https://mock.com',
      },
    ]

    downloadCsvMock.mockResolvedValue(contact_data_mock)
    createContactInHubSpotMock.mockResolvedValue(undefined)

    // Act
    const result = await exportContactsToHubSpot()

    // Assert
    expect(result).toStrictEqual(undefined)
    
    expect(downloadCsvMock).toHaveBeenCalledTimes(1)
    expect(downloadCsv).toHaveBeenCalledWith(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQVC422UOImroDdofLp7bKRniftvfEV8p1E9FoOm5Fc7ysWA4yQa0UMhSw6WUj7vblQml7ZuxtXnmKY/pub?output=csv"
    )

    expect(createContactInHubSpotMock).toHaveBeenCalledTimes(1)
    expect(createContactInHubSpotMock).toHaveBeenCalledWith(contact_data_mock[0]) 
  })

  it('should log an error if downloadCsv returns empty data', async () => {
    // Arrange
    downloadCsvMock.mockResolvedValue(undefined)

    // Act
    const result = await exportContactsToHubSpot()

    // Assert
    expect(result).toStrictEqual(undefined)
    expect(downloadCsvMock).toHaveBeenCalledTimes(1)
    expect(createContactInHubSpotMock).not.toHaveBeenCalled()
  })

  it('should log an error if createContactInHubSpot throws an error', async () => {
    // Arrange
    const contact_data_mock = [
      {
        email: 'test@mock.com', 
        name: 'FistNameMock', 
        company: 'Company Mock',
        phone: '123456789',
        site: 'https://mock.com',
      },
    ]

    downloadCsvMock.mockResolvedValue(contact_data_mock)
    createContactInHubSpotMock.mockRejectedValue(new Error('Contact already in HubSpot'))

    // Act
    const result = await exportContactsToHubSpot()

    // Assert
    expect(result).toStrictEqual(undefined)

    expect(downloadCsvMock).toHaveBeenCalledTimes(1)
    expect(downloadCsv).toHaveBeenCalledWith(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQVC422UOImroDdofLp7bKRniftvfEV8p1E9FoOm5Fc7ysWA4yQa0UMhSw6WUj7vblQml7ZuxtXnmKY/pub?output=csv"
    )

    expect(createContactInHubSpotMock).toHaveBeenCalledTimes(1)
    expect(createContactInHubSpotMock).toHaveBeenCalledWith(contact_data_mock[0])
  })
})