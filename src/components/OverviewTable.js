import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

    const { data } = this.props
    const rows = data

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Family History</TableCell>
            <TableCell align="right">Treatment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(row => (
              <TableRow key={Math.random()}>
                <TableCell component="th" scope="row">
                  {row.country}
                </TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.family_history}</TableCell>
                <TableCell align="right">{row.treatment}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }
}
