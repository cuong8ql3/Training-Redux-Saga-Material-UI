import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Toolbar from '@material-ui/core/Toolbar'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTES } from '../../../Constants'
import styles from './styles'

class SideBar extends Component {
  toggleDrawer = value => {
    const { onToggleSideBar } = this.props
    if (onToggleSideBar) {
      onToggleSideBar(value)
    }
  }

  renderList() {
    const { classes } = this.props
    let xhtml = null
    xhtml = (
      <div className={classes.list}>
        <List component='div'>
          {ADMIN_ROUTES.map(item => {
            return (
              <NavLink
                to={item.path}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
                key={item.name}
              >
                <ListItem className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            )
          })}
        </List>
      </div>
    )
    return xhtml
  }

  render() {
    const { classes, showSideBar } = this.props
    return (
      <div>
        <Drawer
          open={showSideBar}
          onClose={() => this.onToggleSideBar(false)}
          variant='persistent'
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {this.renderList()}
        </Drawer>
        <Toolbar />
      </div>
    )
  }
}

SideBar.propTypes = {
  classes: PropTypes.object,
  showSideBar: PropTypes.bool,
  onToggleSideBar: PropTypes.func,
}

export default withStyles(styles)(SideBar)
