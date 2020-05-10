import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/styles'

import { Button, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import styles from './styles'
import TaskList from '../../Components/TaskList'
import TaskForm from '../../Components/TaskForm'
import SearchBox from '../../Components/SearchBox'

import * as modalActions from '../../Actions/modal'
import { STATUSES } from '../../Constants'
import * as taskActions from '../../Actions/task'

class TaskBoard extends Component {
  componentDidMount() {
    const { taskActionCreators } = this.props
    const { fetchListTask } = taskActionCreators
    fetchListTask()
  }

  handlefilter = e => {
    const { value } = e.target
    const { taskActionCreators } = this.props
    const { filterTask } = taskActionCreators
    filterTask(value)
  }

  handlEditTask = task => {
    const { taskActionCreators, modalActionCreators } = this.props
    const { setTaskEditing } = taskActionCreators
    setTaskEditing(task)

    const {
      showModal,
      changeModalContent,
      changeModalTitle,
    } = modalActionCreators
    showModal()
    changeModalTitle('Cập nhật công việc')
    changeModalContent(<TaskForm />)
  }

  showModalDeleteTask = task => {
    const { modalActionCreators, classes } = this.props
    const {
      showModal,
      hideModal,
      changeModalContent,
      changeModalTitle,
    } = modalActionCreators
    showModal()
    changeModalTitle('Xóa công việc')
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          {'Bạn chắc chắn muốn xóa '}
          <span className={classes.modalTextBold}>{task.title}</span>
          {' ?'}
        </div>
        <Grid container item md={12} justify='flex-end'>
          <Button
            variant='contained'
            color='primary'
            className={classes.modalButton}
            onClick={() => this.handleDeleteTask(task)}
          >
            Đồng ý
          </Button>
          <Button
            variant='contained'
            color='secondary'
            className={classes.modalButton}
            onClick={hideModal}
          >
            Hủy bỏ
          </Button>
        </Grid>
      </div>
    )
  }

  OpenForm = () => {
    const { modalActionCreators, taskActionCreators } = this.props
    const { setTaskEditing } = taskActionCreators
    setTaskEditing(null)

    const {
      showModal,
      changeModalContent,
      changeModalTitle,
    } = modalActionCreators
    showModal()
    changeModalTitle('Thêm mới công việc')
    changeModalContent(<TaskForm />)
  }

  loadData = () => {
    const { taskActionCreators } = this.props
    const { fetchListTask } = taskActionCreators
    fetchListTask()
  }

  handleDeleteTask(task) {
    const { id } = task
    const { taskActionCreators } = this.props
    const { deleteTask } = taskActionCreators
    deleteTask(id)
  }

  renderBoard() {
    const { listTask } = this.props
    let xhtml = null

    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map(status => {
          const taskFiltered = listTask.filter(
            task => task.status === status.value
          )
          return (
            <TaskList
              tasks={taskFiltered}
              status={status}
              key={status.value}
              onEditTask={this.handlEditTask}
              onDeleteTask={this.showModalDeleteTask}
            />
          )
        })}
      </Grid>
    )
    return xhtml
  }

  renderSearchBox() {
    let xhtml = null
    xhtml = <SearchBox handleChange={this.handlefilter} />
    return xhtml
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.taskBoard}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={this.loadData}
          style={{
            marginRight: 20,
          }}
        >
          Load data
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={this.OpenForm}
        >
          <AddIcon />
          Thêm mới công việc
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    )
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    deleteTask: PropTypes.func,
  }),
  listTask: PropTypes.array,
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
}

const mapStateToProps = state => {
  return {
    listTask: state.task.listTask,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
)
