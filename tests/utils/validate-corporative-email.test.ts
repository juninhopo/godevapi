import validateCorporativeEmail from '../../src/utils/validate-corporative-email'

describe('SRC - Utils - HubsSpot - Validate Corporative Email', () => {
  it('should return false for an email without "@" symbol', () => {
    const email = 'invalidemail.com'
    const result = validateCorporativeEmail(email)
    expect(result).toBe(false)
  })

  it('should return false for a generic domain email', () => {
    const email = 'user@gmail.com'
    const result = validateCorporativeEmail(email)
    expect(result).toBe(false)
  })

  it('should return true for a corporative email', () => {
    const email = 'user@company.com'
    const result = validateCorporativeEmail(email)
    expect(result).toBe(true)
  })

  it('should return false for another generic domain email', () => {
    const email = 'user@yahoo.com'
    const result = validateCorporativeEmail(email)
    expect(result).toBe(false)
  })

  it('should return true for another corporative email', () => {
    const email = 'user@enterprise.org'
    const result = validateCorporativeEmail(email)
    expect(result).toBe(true)
  })
})