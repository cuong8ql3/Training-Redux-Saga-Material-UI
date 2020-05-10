import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Grid,
  Fab,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { withStyles } from '@material-ui/styles'
import styles from './styles'

class TaskItem extends Component {
  render() {
    const { classes, task, status, onEditTask, onDeleteTask } = this.props
    const { id, title, description } = task

    return (
      <Card key={id} className={classes.card}>
        <CardContent>
          <Grid container justify='space-between'>
            <Grid item md={8}>
              <Typography component='h2'>{title}</Typography>
            </Grid>
            <Grid item md={4}>
              {status.label}
            </Grid>
          </Grid>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab
            color='primary'
            aria-label='edit'
            className={classes.fab}
            size='small'
            onClick={onEditTask}
          >
            <EditIcon />
          </Fab>
          <Fab
            color='secondary'
            aria-label='delete'
            className={classes.fab}
            size='small'
            onClick={onDeleteTask}
          >
            <DeleteIcon />
          </Fab>
        </CardActions>
      </Card>
    )
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object,
  task: PropTypes.object,
  status: PropTypes.object,
  onEditTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
}

export default withStyles(styles)(TaskItem)
