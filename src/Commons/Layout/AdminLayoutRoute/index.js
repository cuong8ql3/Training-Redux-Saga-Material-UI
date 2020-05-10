import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import DashBoard from '../../../Components/DashBoard'

class AdminLayoutRoute extends Component {
  render() {
    const { component: YourComponent, ...remainProp } = this.props
    return (
      <Route
        {...remainProp}
        render={routeProps => {
          return (
            <DashBoard {...remainProp}>
              <YourComponent {...routeProps} />
            </DashBoard>
          )
        }}
      />
    )
  }
}

AdminLayoutRoute.propTypes = {
  route: PropTypes.object,
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  name: PropTypes.string,
}

export default AdminLayoutRoute
