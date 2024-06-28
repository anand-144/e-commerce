import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  pageButton: {
    margin: '0 5px',
    padding: '5px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'none',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  pageNumber: {
    margin: '0 5px',
    padding: '5px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'none',
    cursor: 'pointer',
  },
  activePage: {
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
  },
}));
