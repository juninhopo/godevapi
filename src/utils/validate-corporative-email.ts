const validateCorporativeEmail = (email: string): boolean => {
  console.log({
    message: 'Validating corporative email',
    email,
  })

  if(!email.includes('@')) {
    console.error({
      message: 'Invalid email',
      email,
    })

    return false
  }

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

export default validateCorporativeEmail