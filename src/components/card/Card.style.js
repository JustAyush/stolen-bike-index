import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.background.white
  },
  imageWrapper: {
    width: '100%',
    height: '10rem',
    [theme.breakpoints.up('md')]: {
      height: '8rem'
    }
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }
}));

export default useStyles;
