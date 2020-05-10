import { Button, Grid, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import * as modalActions from '../../Actions/modal'
import renderTextField from '../FormHelper/TextField'
import renderSelectField from '../FormHelper/SelectField'
import styles from './styles'
import validate from '../../Commons/Validate/validate'
import * as taskActions from '../../Actions/task'

class TaskForm extends Component {
  handleSubmitForm = data => {
    const { taskActionsCreator, taskEditing } = this.props
    const { addTask, updateTask } = taskActionsCreator
    const { title, description, status } = data
    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status)
    } else {
      addTask(title, description)
    }
  }

  renderStatusSelection() {
    let xhtml = null
    const { taskEditing } = this.props
    if (taskEditing !== null) {
      xhtml = (
        <Field
          id='status'
          label='Trạng thái'
          component={renderSelectField}
          name='status'
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Field>
      )
    }
    return xhtml
  }

  render() {
    const {
      classes,
      modalActionsCreator,
      handleSubmit,
      invalid,
      submitting,
    } = this.props
    const { hideModal } = modalActionsCreator
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Field
              id='outlined-basic'
              label='Tiêu đề'
              variant='outlined'
              className={classes.textField}
              component={renderTextField}
              name='title'
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id='standard-multiline-static'
              label='Mô tả'
              variant='outlined'
              multiline
              rows={4}
              className={classes.textField}
              component={renderTextField}
              name='description'
            />
          </Grid>
          <Grid item md={12}>
            {this.renderStatusSelection()}
          </Grid>
          <Grid container item md={12} justify='flex-end'>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              type='submit'
              disabled={invalid || submitting}
            >
              Lưu lại
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={hideModal}
            >
              Hủy bỏ
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

TaskForm.propTypes = {
  classes: PropTypes.object,
  modalActionsCreator: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  taskActionsCreator: PropTypes.shape({
    addTask: PropTypes.func,
    updateTask: PropTypes.func,
  }),
  taskEditing: PropTypes.object,
}

const mapStateToProps = state => ({
  taskEditing: state.task.taskEditing,
  initialValues: state.task.taskEditing,
  // initialValues: {
  //   title: state.task.taskEditing ? state.task.taskEditing.title : null,
  //   description: state.task.taskEditing
  //     ? state.task.taskEditing.description
  //     : null,
  //   status: state.task.taskEditing ? state.task.taskEditing.status : null,
  // },
})
const mapDispatchToProps = dispatch => ({
  modalActionsCreator: bindActionCreators(modalActions, dispatch),
  taskActionsCreator: bindActionCreators(taskActions, dispatch),
})

const FORM_NAME = 'TASK_MANAGEMENT'
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
})
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withStyles(styles), withConnect, withReduxForm)(TaskForm)
