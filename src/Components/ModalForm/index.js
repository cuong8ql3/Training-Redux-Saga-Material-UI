import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'

import { Modal, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import * as modalActions from '../../Actions/modal'

class ModalForm extends Component {
  render() {
    const { classes, open, component, modalActionsCreator, title } = this.props
    const { hideModal } = modalActionsCreator
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
            <CloseIcon className={classes.CloseIcon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    )
  }
}

ModalForm.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  component: PropTypes.object,
  title: PropTypes.string,
  modalActionsCreator: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
}

const mapStateToProps = state => ({
  open: state.modal.showModal,
  title: state.modal.title,
  component: state.modal.component,
})

const mapDispatchToProps = dispatch => ({
  modalActionsCreator: bindActionCreators(modalActions, dispatch),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withStyles(styles), withConnect)(ModalForm)
