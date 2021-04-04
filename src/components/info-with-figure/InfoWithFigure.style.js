import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '4rem'
  },
  text: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.light,
    lineHeight: 1.75,
    textAlign: 'center',
    maxWidth: '20rem'
  }
}));

export default useStyles;
