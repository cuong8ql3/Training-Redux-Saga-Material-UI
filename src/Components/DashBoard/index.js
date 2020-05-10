import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import cn from 'classnames'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import Header from './Header'
import SideBar from './SideBar'
import * as uiAction from '../../Actions/ui'

class Dashboard extends Component {
  handleToggleSideBar = value => {
    const { uiActionCreators } = this.props
    const { showSideBar, hideSideBar } = uiActionCreators
    if (value === true) {
      showSideBar()
    } else {
      hideSideBar()
    }
  }

  render() {
    const { children, classes, name, showSideBar } = this.props
    return (
      <div className={classes.dashboard}>
        <Header
          name={name}
          showSideBar={showSideBar}
          onToggleSideBar={this.handleToggleSideBar}
        />
        <div className={classes.wrapper}>
          <SideBar
            showSideBar={showSideBar}
            onToggleSideBar={this.handleToggleSideBar}
          />
          <div
            className={cn(classes.wrapperContent, {
              [classes.shiftLeft]: showSideBar === false,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  showSideBar: PropTypes.bool,
  uiActionCreators: PropTypes.shape({
    showSideBar: PropTypes.func,
    hideSideBar: PropTypes.func,
  }),
}

const mapStateToProps = state => {
  return {
    showSideBar: state.ui.showSideBar,
  }
}

const mapDispathToProps = dispath => {
  return {
    uiActionCreators: bindActionCreators(uiAction, dispath),
  }
}

const withConnect = connect(mapStateToProps, mapDispathToProps)
export default compose(withStyles(styles), withConnect)(Dashboard)
