import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import TaskItem from '../TaskItem'

class TaskList extends Component {
  render() {
    const { classes, tasks, status, onEditTask, onDeleteTask } = this.props
    return (
      <Grid item xs={12} md={4} lg={4} key={status.value}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>

        <div className={classes.wrapperListTask}>
          {tasks.map(task => {
            return (
              <TaskItem
                task={task}
                status={status}
                key={task.id}
                onEditTask={() => onEditTask(task)}
                onDeleteTask={() => onDeleteTask(task)}
              />
            )
          })}
        </div>
      </Grid>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array,
  status: PropTypes.object,
  onEditTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
}

export default withStyles(styles)(TaskList)
