import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ checkoutToken }) => {
  // Check if checkoutToken or checkoutToken.line_items is undefined/null
  if (!checkoutToken || !checkoutToken.line_items) {
    return (
      <Typography variant='subtitle1'>
        No items in the order summary.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>Order Summary</Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.id}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
            {checkoutToken.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}

export default Review;
