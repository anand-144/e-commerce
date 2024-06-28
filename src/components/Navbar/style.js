// style.js (or style.css) for Navbar
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff', // Example background color
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-family)', // Applying custom fontFamily
    color: theme.palette.text.primary, // Use theme color
    textDecoration: 'none',
  },
  image: {
    marginRight: '10px',
    height: '40px',
    width: '40px',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    display: 'flex',
  },
}));
