import React from 'react'
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import OverviewChart from './components/OverviewChart'
import OverviewTable from './components/OverviewTable'

export default class Home extends React.Component {
  render() {
    const { loading, data, } = this.props

    if (loading) {
      return <LinearProgress />
    }

    return <>
      <OverviewChart data={data} />
      <hr/>
      <Container fixed>
        <OverviewTable data={data} />
      </Container>
    </>
  }
}