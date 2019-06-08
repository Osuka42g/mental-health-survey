import React from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import LinearProgress from '@material-ui/core/LinearProgress'

import {
  ResponsiveContainer, BarChart, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

import {
  benefitsComparison,
  workInterfereComparison,
  wellnessComparison,
} from './controller/dataController'

import FilterList from './components/FilterList'

const filterOptions = [
  {
    key: 'canada',
    label: 'Canada',
  },
  {
    key: 'uk',
    label: 'UK',
  },
  {
    key: 'usa',
    label: 'USA',
  },
]

const possibleCountries = {
  canada: 'Canada',
  uk: 'United Kingdom',
  usa: 'United States',
}

const limitPossibleEmployees = [
  '1-5',
  '6-25',
  '26-100',
  '100-500',
  '500-1000',
  'More than 1000',
]

export default class Details extends React.Component {
  state = {
    employeesGroup: limitPossibleEmployees[0],
    filters: {
      canada: true,
      uk: true,
      usa: true,
    }
  }

  handleToggle(value) {
    const { filters } = this.state
    filters[value] = !filters[value]
    this.setState({ filters })
  }

  filterByCountries(data, countries) {
    return data.filter(e => countries.includes(e.country))
  }

  filterDataByEmployees(data, employees) {
    return data.filter(e => e.no_employees === employees)
  }

  getSelectedCountriesArray = () => {
    const { filters } = this.state
    const selectedCountries = []
    for (const key in filters) {
      if (filters[key]) {
        selectedCountries.push(possibleCountries[key])
      }
    }
    return selectedCountries
  }

  getDataFiltered() {
    const { data, } = this.props
    const { employeesGroup, } = this.state

    const selectedCountries = this.getSelectedCountriesArray()

    const dataEmployeesGrouped = this.filterDataByEmployees(data, employeesGroup)
    const countriesFiltered = this.filterByCountries(dataEmployeesGrouped, selectedCountries)

    return countriesFiltered
  }

  render() {
    const { loading, } = this.props
    const { employeesGroup, } = this.state

    const filteredData = this.getDataFiltered()
    const wellnessResults = wellnessComparison(filteredData)
    const interfereResults = workInterfereComparison(filteredData)
    const benefitsResults = benefitsComparison(filteredData)

    if (loading) {
      return <LinearProgress />
    }

    return <>
      <FilterList
        options={filterOptions}
        statuses={this.state.filters}
        handleToggle={(key) => this.handleToggle(key)}
      />
      <div className={'company-size'} style={{ padding: 10 }}>
        <label>Company size:</label>
        <Select
          value={employeesGroup}
          autoWidth={true}
          onChange={e => this.setState({ employeesGroup: e.target.value })}
        >
          {limitPossibleEmployees.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
        </Select>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div style={{ height: 400 }}>
            <div style={{ marginLeft: 30 }}>
              <h5>Wellness Program vs Mental Health Consquence</h5>
            </div>
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={wellnessResults}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="wellness_program" name="Companies with wellness program" fill="#8884d8" />
              <Bar dataKey="mental_health_consequence" name="Companies with mental health consequence" fill="#f46b42" />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ height: 400 }}>
            <div style={{ marginLeft: 30 }}>
              <h5>Care options vs Tech Companies</h5>
            </div>
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={interfereResults}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="care_options" name="Have care options.." fill="#bfa35d" />
              <Bar dataKey="tech_company" name="In tech?" fill="#5d81bf" />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ height: 400 }}>
            <div style={{ marginLeft: 30 }}>
              <h5>Benefits plan</h5>
            </div>
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={benefitsResults}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
                <Bar dataKey="benefits_yes" name="Yes" fill="#5dbf85" />
                <Bar dataKey="benefits_no" name="No" fill="#bf5d96" />
                <Bar dataKey="benefits_dontknow" name="Don't know" fill="#54499b" />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    </>
  }
}