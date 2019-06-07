import React from 'react'
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import OverviewChart from './components/OverviewChart'
import OverviewTable from './components/OverviewTable'

import { data, dataModel } from './static/data'

export default class Home extends React.Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1000)
  }

  render() {
    const { isLoading } = this.state
    console.log(this.props.limit)
    if (isLoading) {
      return <LinearProgress />
    }

    return <>
      <OverviewChart data={data} dataModel={dataModel} />
      <hr/>
      <Container fixed>
        <OverviewTable data={data} dataModel={dataModel} />
      </Container>
    </>
  }
}