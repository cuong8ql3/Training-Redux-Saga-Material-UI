import React, { Component } from 'react'

import { withStyles } from '@material-ui/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../Commons/Theme'
import styles from './styles'
import configStore from '../../Redux/configStore'
// import TaskBoard from '../Taskboard'
import GlobalLoading from '../../Components/GlobalLoading'
import ModalForm from '../../Components/ModalForm'
import { ADMIN_ROUTES } from '../../Constants'
import AdminLayoutRoute from '../../Commons/Layout/AdminLayoutRoute'

const store = configStore()

export default withStyles(styles)(
  class App extends Component {
    renderAdminRoutes() {
      let xhtml = null
      xhtml = ADMIN_ROUTES.map(route => {
        return (
          <AdminLayoutRoute
            key={route.name}
            path={route.path}
            component={route.component}
            exact={route.exact}
            name={route.name}
          />
        )
      })
      return xhtml
    }

    render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ToastContainer />
              <GlobalLoading />
              <ModalForm />
              <Switch>{this.renderAdminRoutes()}</Switch>
              {/* <TaskBoard /> */}
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
    }
  }
)
