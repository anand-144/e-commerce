import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { MdAddShoppingCart } from "react-icons/md"; // Import MdShare icon
import useStyles from "./style";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image.url}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontFamily: "var(--font-family)" }}
          >
            {product.name}
          </Typography>
          <Typography variant="h6" style={{ fontFamily: "var(--font-family)" }}>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontFamily: "var(--font-family)" }}
        >
          {product.seo.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to cart"
          onClick={() => onAddToCart(product.id, 1)} >
          <MdAddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
