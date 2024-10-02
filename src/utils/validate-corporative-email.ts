const validateCorporativeEmail = (email: string): boolean => {
  console.log({
    message: 'Validating corporative email',
    email,
  })

  // Validate if correct email
  if(!email.includes('@')) {
    console.error({
      message: 'Invalid email',
      email,
    })

    return false
  }

  // Validate email is corporative
  const genericDomains = [
    'gmail.com',
    'hotmail.com',
    'live.com',
    'yahoo.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'mail.com',
    'zoho.com',
    'protonmail.com'
  ]

  // Verify domain in generic domains
  const emailDomain = email.split('@')[1]
  if (genericDomains.includes(emailDomain)) {
    console.error({
      message: 'Email is not corporative',
      email,
    })

    return false
  }

  console.log({
    message: 'Email is corporative',
    email,
  })

  return true
}

validateCorporativeEmail('contato@umaletra.com')

export default validateCorporativeEmail