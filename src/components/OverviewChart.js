import React from 'react'
import Grid from '@material-ui/core/Grid'
import {
  ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

import { normalizeOverviewData } from '../controller/dataController'
import FilterList from './FilterList'
import FilterSlider from './FilterSlider'

const filterOptions = [
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

export default class OverviewChart extends React.Component {
  state = {
    dataChart: [],
    filters: {
      entries: true,
      age: true,
      gender: true,
      treatment: true,
      familyHistory: true,
    },
    minEntries: 42,
  }

  handleToggle(value) {
    const { filters } = this.state
    filters[value] = !filters[value]
    this.setState({ filters })
  }

  updateMinEnties(minEntries) {
    this.setState({ minEntries }, () => this.updateDataSourceMapping())
  }

  updateDataSourceMapping() {
    const { data } = this.props
    const { minEntries } = this.state
    this.setState({ dataChart: normalizeOverviewData(data, minEntries) })
  }

  componentDidMount() {
    this.updateDataSourceMapping()
  }

  render() {
    const { dataChart, filters, minEntries, } = this.state

    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <div style={{ marginLeft: 30 }}>
            <h4>Filters</h4>
          </div>
          <FilterList
            options={filterOptions}
            statuses={this.state.filters}
            handleToggle={(key) => this.handleToggle(key)}
          />
          <FilterSlider
            value={minEntries}
            onUpdate={value => this.updateMinEnties(value)}
          />
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
                {filters.entries && <Area type="monotone" name="Entries count" dataKey="entries" fill="#8884d8" stroke="#8884d8" />}
                {filters.age && <Bar barSize={100} stackId="age" name="Up to 20 years" dataKey="ageUp20" fill="#669900" />}
                {filters.age && <Bar barSize={100} stackId="age" name="Up to 40 years" dataKey="ageUp40" fill="#009933" />}
                {filters.age && <Bar barSize={100} stackId="age" name="Up to 60 years" dataKey="ageUp60" fill="#006600" />}
                {filters.age && <Bar barSize={100} stackId="age" name="More than 60 years" dataKey="ageMore60" fill="#0000cc" />}
                {filters.familyHistory && <Bar barSize={75} name="Family Mental Illness" dataKey="familyMentalIllness" fill="#669999" />}
                {filters.treatment && <Bar barSize={75} name="In treatment" dataKey="treatment" fill="#ff9900" />}
                {filters.gender && <Line type="monotone" name="Males" dataKey="genderMale" stroke="#3366ff" />}
                {filters.gender && <Line type="monotone" name="Females" dataKey="genderFemale" stroke="#ff6699" />}
                {filters.gender && <Line type="monotone" name="Other gender" dataKey="genderUnknow" stroke="#9999ff" />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    )
  }
}
