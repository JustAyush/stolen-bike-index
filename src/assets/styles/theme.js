import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// colors
const primary = '#00234B';
const secondary = '#239CC1';
const text = '#00234B';
const lightText = '#878791';
const background = '#EBECED';
const whiteBackground = '#FFF';

// breakpoints
const xs = 0;
const sm = 600;
const md = 768;
const lg = 992;
const xl = 1280;
const xxl = 1600;

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl
    }
  },
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    },
    text: {
      main: text,
      light: lightText
    },
    background: {
      default: background,
      white: whiteBackground
    }
  },
  typography: {
    fontFamily: ['Poppins'].join(','),
    allVariants: {
      color: text
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.25
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1
    }
  },
  props: {
    // Button
    MuiButtonBase: {
      disableRipple: true
    },
    // Typography
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        body1: 'p',
        subtitle1: 'p'
      }
    }
  }
});

export default responsiveFontSizes(theme);
