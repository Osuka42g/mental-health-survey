import React from 'react'
import {
  ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

import { data, dataModel } from './../static/data'

const defineGenderGroup = gender => {
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

const defineAgeGroup = age => {
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

const toBool = str => {
  return str === 'Yes'
}

const defineFamilyIllnessGroup = family_history => {
  return toBool(family_history)
    ? 'familyMentalIllness'
    : 'dispose'
}

const defineTreatmentGroup = treatment => {
  return toBool(treatment)
    ? 'treatment'
    : 'dispose'
}

const fetchData = () => {
  // this is from backend of course
  const newData = {}
  data.forEach(e => {
    const { country, gender, age, family_history, treatment, } = e
    if (!newData[country]) {
      newData[country] = { ...dataModel, country, }
    }
    const summatory = newData[country]

    summatory.entries += 1
    summatory[defineGenderGroup(gender)] += 1
    summatory[defineAgeGroup(age)] += 1
    summatory[defineFamilyIllnessGroup(family_history)] += 1
    summatory[defineTreatmentGroup(treatment)] += 1
  })

  const dataToReturn = []
  for (const key in newData) {
    let dataBycountry = newData[key]
    if (dataBycountry.entries > 30)
      dataToReturn.push({ ...dataBycountry })
  }

  return dataToReturn
}

export default class OverviewTable extends React.Component {

  state = {
    showAge: true,
    showGender: true,
  }

  render() {
    const dataChart = fetchData()

    const { showAge, showGender, } = this.state

    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={dataChart}
            margin={{
              top: 10, right: 10, bottom: 10, left: 10,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" name="Entries count" dataKey="entries" fill="#8884d8" stroke="#8884d8" />
            {
              showAge && <>
                <Bar barSize={100} stackId="age" name="Up to 20 years" dataKey="ageUp20" fill="#669900" />
                <Bar barSize={100} stackId="age" name="Up to 40 years" dataKey="ageUp40" fill="#009933" />
                <Bar barSize={100} stackId="age" name="Up to 60 years" dataKey="ageUp60" fill="#006600" />
                <Bar barSize={100} stackId="age" name="More than 60 years" dataKey="ageMore60" fill="#0000cc" />
              </>
            }
            <Bar barSize={75} name="Family Mental Illness" dataKey="familyMentalIllness" fill="#669999" />
            <Bar barSize={75} name="In treatment" dataKey="treatment" fill="#ff9900" />
            {
              showGender && <>
                <Line type="monotone" name="Males" dataKey="genderMale" stroke="#3366ff" />
                <Line type="monotone" name="Females" dataKey="genderFemale" stroke="#ff6699" />
                <Line type="monotone" name="Other gender" dataKey="genderUnknow" stroke="#9999ff" />
              </>
            }
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
