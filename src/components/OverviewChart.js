import React from 'react'
import Grid from '@material-ui/core/Grid'
import {
  ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

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

export default class OverviewChart extends React.Component {
  state = {
    dataChart: [],
    filters: {
      entries: true,
      age: true,
      gender: true,
      treatment: true,
      familyHistory: true,
    }
  }

  fetchData() {
    // this is from backend of course
    const { data, dataModel } = this.props

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

  handleToggle(value) {
    const { filters } = this.state
    filters[value] = !filters[value]
    this.setState({ filters })
  }

  componentDidMount() {
    this.setState({ dataChart: this.fetchData() })
  }

  render() {
    const { dataChart, filters, } = this.state
    console.log(filters)

    const listFilters = [
      {
        key: 'entries',
        label: 'Entries count',
      },
      {
        key: 'age',
        label: 'Age',
      },
      {
        key: 'gender',
        label: 'Gender',
      },
      {
        key: 'familyHistory',
        label: 'Family history of mental illnesses',
      },
      {
        key: 'treatment',
        label: 'Treatment sought for a mental health condition',
      },
    ]

    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <h4>Filters</h4>
          <List>
            { listFilters.map(value => {
              const { key, label, } = value
              const checked = this.state.filters[key]
              const labelId = `checkbox-list-label-${key}`

              return (
                <ListItem key={`list-${key}`} role={undefined} dense button onClick={() => this.handleToggle(key)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={label} />
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <div style={{ height: 400 }}>
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
              { filters.entries && <Area type="monotone" name="Entries count" dataKey="entries" fill="#8884d8" stroke="#8884d8" /> }
              { filters.age && <Bar barSize={100} stackId="age" name="Up to 20 years" dataKey="ageUp20" fill="#669900" /> }
              { filters.age && <Bar barSize={100} stackId="age" name="Up to 40 years" dataKey="ageUp40" fill="#009933" /> }
              { filters.age && <Bar barSize={100} stackId="age" name="Up to 60 years" dataKey="ageUp60" fill="#006600" /> }
              { filters.age && <Bar barSize={100} stackId="age" name="More than 60 years" dataKey="ageMore60" fill="#0000cc" /> }
              { filters.familyHistory && <Bar barSize={75} name="Family Mental Illness" dataKey="familyMentalIllness" fill="#669999" /> }
              { filters.treatment && <Bar barSize={75} name="In treatment" dataKey="treatment" fill="#ff9900" /> }
              { filters.gender && <Line type="monotone" name="Males" dataKey="genderMale" stroke="#3366ff" /> }
              { filters.gender && <Line type="monotone" name="Females" dataKey="genderFemale" stroke="#ff6699" /> }
              { filters.gender && <Line type="monotone" name="Other gender" dataKey="genderUnknow" stroke="#9999ff" /> }
            </ComposedChart>
          </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    )
  }
}
