import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  '@global': {
    '*': {
      padding: 0,
      margin: 0,
      boxSizing: 'border-box'
    },
    '*:focus': {
      outline: 0
    },
    '.font-bold': {
      fontWeight: 700
    },
    'font-normal': {
      fontWeight: 400
    },
    '.text-muted': {
      color: theme.palette.text.light
    },
    '.block': {
      display: 'block'
    },
    '.inline-block': {
      display: 'inline-block'
    },
    '.inline': {
      display: 'inline'
    },
    '.mr-2': {
      marginRight: '0.5rem'
    },
    '.ml-4': {
      marginLeft: '1rem'
    }
  }
});

function globalStyles() {
  return null;
}

export default withStyles(styles, { withTheme: true })(globalStyles);
