import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  color: {
    primary: '#D32F2F',
    secondary: '#00BCD4',
    error: '#F57C00',
    textColor: '#ffffff',
    cardColor: '#8481FE',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    backgroundColor: '#E040FB',
    textColor: '#5D4037',
    border: '#CCCCCC',
  },
})

export default theme
