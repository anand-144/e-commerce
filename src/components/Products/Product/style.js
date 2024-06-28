// style.js (or style.css) for Product
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0), // Set default margin (adjust as needed)
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8), // Increase margin for xs devices
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8), // Adjust margin for tablets (sm devices)
    },
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem', // Decrease font size for smaller devices
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem', // Default font size for medium and larger devices
    },
  },
}));
