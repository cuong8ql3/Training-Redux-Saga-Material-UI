import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
// import InputBase from '@material-ui/core/InputBase'
// import SearchIcon from '@material-ui/icons/Search'
// import MailIcon from '@material-ui/icons/Mail'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import MoreIcon from '@material-ui/icons/MoreVert'
// import Badge from '@material-ui/core/Badge'
import styles from './styles'

const menuId = 'primary-search-account-menu'
// const mobileMenuId = 'primary-search-account-menu-mobile'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // mobileMoreAnchorEl: null,
      anchorEl: null,
    }
  }

  handleProfileMenuOpen = e => {
    this.setState({
      anchorEl: e.currentTarget,
    })
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  handleToggleSideBar = () => {
    const { showSideBar, onToggleSideBar } = this.props
    if (onToggleSideBar) {
      onToggleSideBar(!showSideBar)
    }
  }
  // handleMobileMenuOpen = e => {
  //   this.setState({
  //     mobileMoreAnchorEl: e.currentTarget,
  //   })
  // }

  // handleMobileMenuClose = () => {
  //   console.log('handleMobileMenuClose')
  // }

  renderMenu = () => {
    const { anchorEl } = this.state
    const isMenuOpen = Boolean(anchorEl)
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {/* <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem> */}
        <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
      </Menu>
    )
  }

  // renderMobileMenu = () => {
  //   const { mobileMoreAnchorEl } = this.state
  //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  //   return (
  //     <Menu
  //       anchorEl={mobileMoreAnchorEl}
  //       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //       id={mobileMenuId}
  //       keepMounted
  //       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //       open={isMobileMenuOpen}
  //       onClose={this.handleMobileMenuClose}
  //     >
  //       {/* <MenuItem>
  //         <IconButton aria-label='show 4 new mails' color='inherit'>
  //           <Badge badgeContent={4} color='secondary'>
  //             <MailIcon />
  //           </Badge>
  //         </IconButton>
  //         <p>Messages</p>
  //       </MenuItem>
  //       <MenuItem>
  //         <IconButton aria-label='show 11 new notifications' color='inherit'>
  //           <Badge badgeContent={11} color='secondary'>
  //             <NotificationsIcon />
  //           </Badge>
  //         </IconButton>
  //         <p>Notifications</p>
  //       </MenuItem> */}
  //       <MenuItem onClick={this.handleProfileMenuOpen}>
  //         <IconButton
  //           aria-label='account of current user'
  //           aria-controls='primary-search-account-menu'
  //           aria-haspopup='true'
  //           color='inherit'
  //         >
  //           <AccountCircle />
  //         </IconButton>
  //         <p>Profile</p>
  //       </MenuItem>
  //     </Menu>
  //   )
  // }

  render() {
    const { classes, name } = this.props
    return (
      <div className={classes.grow}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={this.handleToggleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
              {name}
            </Typography>
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* <IconButton aria-label='show 4 new mails' color='inherit'>
                <Badge badgeContent={4} color='secondary'>
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge badgeContent={17} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={this.handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
            {/* <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={this.handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div> */}
          </Toolbar>
        </AppBar>
        {/* {this.renderMobileMenu()} */}
        {this.renderMenu()}
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  showSideBar: PropTypes.bool,
  onToggleSideBar: PropTypes.func,
}

export default withStyles(styles)(Header)
