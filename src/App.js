import React, { useState, useEffect, useCallback, } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Home from './Home'
import Details from './Details'

import { fetchData, } from './controller/dataController'

const limitPossibles = [100, 500, 'All',]

export default function DefaultRoute(props) {
  const [data, setData] = useState([])
  const [limit, setLimit] = useState('All')
  const [loading, setLoading] = useState(true)
  const [selectedData, setSelectedData] = useState([])

  const fetchRemoteData = async () => {
    const fetched = await fetchData()
    setData(fetched)
    setLoading(false)
  }

  const sliceData = useCallback(() =>
    limit === 'All'
      ? data
      : data.slice(Math.max(0, limit))
  , [limit, data])

  useEffect(() => {
    const fd = async () => await fetchRemoteData()
    fd()
  }, [])

  useEffect(() => {
    setSelectedData(sliceData())
  }, [limit, sliceData])

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
                onChange={e => setLimit(e.target.value)}
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

const itemStyle = {
  marginLeft: 50
}
