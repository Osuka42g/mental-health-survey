import React from 'react'
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import OverviewChart from './components/OverviewChart'
import OverviewTable from './components/OverviewTable'

export default function Home(props) {
    const { loading, data, } = props

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