import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Home from './Home'
import Details from './Details'

import { fetchData, } from './controller/dataController'

export default class defaultRoute extends React.Component {
  state = {
    data: [],
    limit: 'All',
    loading: true,
  }

  async componentDidMount() {
    this.fetchRemoteData()
  }

  async fetchRemoteData() {
    const fetched = await fetchData()
    this.setState({ data: fetched, loading: false, })
  }

  sliceData(limit) {
    const { data } = this.state
    return limit === 'All'
      ? data
      : data.slice(Math.max(0, limit))
  }

  render() {
    const { limit, loading, } = this.state
    const limitPossibles = [ 100, 500, 'All', ]
    const selectedData = this.sliceData(limit)

    return (
      <Router>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography style={itemStyle} variant="h6" color="inherit">
              <Link to="/">Home</Link>
            </Typography>
            <Typography style={itemStyle} variant="h6" color="inherit">
              <Link to="/details">Details</Link>
            </Typography>
            <Typography style={itemStyle} variant="h6" color="inherit">
              <Select
                value={limit}
                autoWidth={true}
                onChange={e => this.setState({ limit: e.target.value })}
              >
              {limitPossibles.map(e => <MenuItem key={e} value={e}>{e}</MenuItem> )}
              </Select>
            </Typography>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={() => <Home limit={limit} data={selectedData} loading={loading} />} />
        <Route path="/details" component={() => <Details limit={limit} data={selectedData} loading={loading} />} />
      </Router>
    )
  }
}

const itemStyle = {
  marginLeft: 50
}
