const styles = () => ({
  drawerPaper: {
    width: 200,
    maxWidth: 200,
    zIndex: 10,
    // height: '100%',
    height: '100vh',
    maxHeight: '100vh',
    position: 'relative',
  },
  menuLink: {
    textDecoration: 'none',
    color: 'blue',
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: 'rgba(0,0,0,0.08)',
    },
  },
})
export default styles
