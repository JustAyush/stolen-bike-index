import makeStyles from '@material-ui/core/styles/makeStyles';

const shadeInputBaseStyles = (theme) => {
  const color = theme.palette.secondary.main;
  const error = '#ff6b81';
  return {
    root: {
      backgroundColor: theme.palette.grey[200],
      transition: '0.3s'
    },
    focused: {
      backgroundColor: theme.palette.common.white,
      boxShadow: `0 0 0 2px ${color}`
    },
    error: {
      backgroundColor: '#fff0f0',
      '&$focused': {
        boxShadow: `0 0 0 2px ${error}`
      }
    },
    disabled: {
      backgroundColor: theme.palette.grey[50]
    },
    input: {
      padding: '1rem'
    },
    formControl: {
      'label + &': {
        marginTop: 24
      }
    }
  };
};

const shadeInputLabelStyles = ({ palette }) => ({
  root: {
    color: palette.text.primary,
    '&$focused:not($error)': {
      color: palette.text.primary
    }
  },
  error: {},
  focused: {},
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.8)',
    letterSpacing: 1
  }
});

export const useshadeInputBaseStyles = makeStyles(shadeInputBaseStyles, {
  name: 'ShadeTextField'
});

export const useshadeInputLabelStyles = makeStyles(shadeInputLabelStyles, {
  name: 'ShadeTextField'
});
