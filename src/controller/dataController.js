import Wellness from '../models/WellnessModel'
import WorkInterfere from '../models/WorkInterfereModel'
import Benefits from '../models/BenefitsModel'

const objToArray = obj => {
  const converted = []
  for (const key in obj) {
    let singleObj = obj[key]
    converted.push({ ...singleObj })
  }
  return converted
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
