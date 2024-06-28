import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { FaMinus, FaPlus } from 'react-icons/fa';
import useStyles from './style';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="medium"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
            className={classes.buttonMinus}
          >
            <FaMinus />
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="medium"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
            className={classes.buttonPlus}
          >
            <FaPlus />
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
