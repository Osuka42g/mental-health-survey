import Wellness from '../models/WellnessModel'
import WorkInterfere from '../models/WorkInterfereModel'
import Benefits from '../models/BenefitsModel'

const serviceEndpoint = 'https://cartelito.s3.us-east-2.amazonaws.com/health_data.json'

const objToArray = obj => {
  const converted = []
  for (const key in obj) {
    let singleObj = obj[key]
    converted.push({ ...singleObj })
  }
  return converted
}

const toBool = str => {
  return str === 'Yes'
}

export const fetchData = async () => {
  try {
    const JSONhealthData = await fetch(serviceEndpoint)
    const healthData = await JSONhealthData.json()

    return healthData
  } catch(err) {
    // Handle this
    console.log('Something broke while fetching data', err)
  }
}

export const wellnessComparison = data => {
  const byCountry = {}

  data.forEach(e => {
    if (!byCountry[e.country]) {
      byCountry[e.country] = { ...Wellness }
    }

    const summatory = byCountry[e.country]
    summatory.country = e.country
    summatory.wellness_program += e.wellness_program === 'Yes' ? 1 : 0
    summatory.mental_health_consequence += e.mental_health_consequence === 'Yes' ? 1 : 0
  })

  return objToArray(byCountry)
}

export const workInterfereComparison = data => {
  const byCountry = {}

  data.forEach(e => {
    if (!byCountry[e.country]) {
      byCountry[e.country] = { ...WorkInterfere }
    }

    const summatory = byCountry[e.country]
    summatory.country = e.country
    summatory.care_options += e.care_options === 'Yes' ? 1 : 0
    summatory.tech_company += e.tech_company === 'Yes' ? 1 : 0
  })

  return objToArray(byCountry)
}

export const benefitsComparison = data => {
  const byCountry = {}

  data.forEach(e => {
    if (!byCountry[e.country]) {
      byCountry[e.country] = { ...Benefits }
    }

    const summatory = byCountry[e.country]
    summatory.country = e.country
    summatory.benefits_yes += e.benefits === 'Yes' ? 1 : 0
    summatory.benefits_no += e.benefits === 'No' ? 1 : 0
    summatory.benefits_dontknow += e.benefits === 'Don\'t Know' ? 1 : 0
  })

  return objToArray(byCountry)
}


export const filterByCountries = (data, countries) => {
  return data.filter(e => countries.includes(e.country))
}

export const filterDataByEmployees = (data, employees) => {
  return data.filter(e => e.no_employees === employees)
}


export const defineGenderGroup = gender => {
  switch (gender.toLowerCase()) {
    case 'm':
    case 'male':
      return 'genderMale'
    case 'f':
    case 'female':
      return 'genderFemale'
    default:
      return 'genderUnknow'
  }
}

export const defineAgeGroup = age => {
  if (age > 60) {
    return 'ageMore60'
  }
  if (age > 40) {
    return 'ageUp60'
  }
  if (age > 20) {
    return 'ageUp40'
  }
  return 'ageUp20'
}

export const defineFamilyIllnessGroup = family_history => {
  return toBool(family_history)
    ? 'familyMentalIllness'
    : 'dispose'
}

export const defineTreatmentGroup = treatment => {
  return toBool(treatment)
    ? 'treatment'
    : 'dispose'
}