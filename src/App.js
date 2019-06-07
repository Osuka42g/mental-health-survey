import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Details from './Details'

function defaultRoute() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">Details</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/details" component={Details} />
      </div>
    </Router>
  )
}

export default defaultRoute
