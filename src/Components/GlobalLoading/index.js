import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import IconLoading from '../../vendor/img/iconLoading1.gif'

class globalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props
    let xhtml = null
    if (showLoading) {
      xhtml = (
        <div className={classes.globalLoading}>
          <img src={IconLoading} alt='Loading' className={classes.icon} />
        </div>
      )
    }
    return xhtml
  }
}

globalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
}

const mapStateToProps = state => {
  return {
    showLoading: state.ui.showLoading,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     uiAction: bindActionCreators(uiAction, dispatch),
//   }
// }
const withConnect = connect(mapStateToProps, null)
// export default withStyles(styles)(withConnect(globalLoading))
export default compose(withStyles(styles), withConnect)(globalLoading)
