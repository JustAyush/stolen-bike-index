import makeStyles from '@material-ui/core/styles/makeStyles';

import {
  textInputError,
  textInputErrorBackground
} from '../../assets/styles/theme';

const shadeInputBaseStyles = (theme) => {
  const color = theme.palette.secondary.main;
  const error = textInputError;
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
      backgroundColor: textInputErrorBackground,
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

const placeAutocompleteStyles = {
  cover: {
    position: 'relative',
    zIndex: 20,
    marginTop: '16px'
  },
  suggestion: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 20,
    borderRadius: '6px',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.12)',
    width: '100%'
  },
  places: {
    backgroundColor: 'white',
    zIndex: 20,
    fontSize: '16px',
    padding: '8px 5px',
    cursor: 'pointer'
  }
};

export const useStyles = makeStyles((theme) => ({
  searchBtn: {
    color: theme.palette.background.white,
    boxShadow: theme.shadows[0],
    marginLeft: theme.spacing(1.5),
    paddingTop: theme.spacing(2.1),
    paddingBottom: theme.spacing(2.1),
    marginTop: theme.spacing(0.8),
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%'
    },
    '& p': {
      color: theme.palette.background.white,
      marginLeft: theme.spacing(2),
      fontSize: '1rem',
      textTransform: 'capitalize'
    }
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap'
    }
  },
  formControlMarginTop: {
    marginTop: '16px'
  }
}));

export const useshadeInputBaseStyles = makeStyles(shadeInputBaseStyles, {
  name: 'ShadeTextField'
});

export const useshadeInputLabelStyles = makeStyles(shadeInputLabelStyles, {
  name: 'ShadeTextField'
});

export const usePlaceAutocompleteStyles = makeStyles(placeAutocompleteStyles, {
  name: 'PlaceAutocomplete'
});
