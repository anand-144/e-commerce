import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import Pagination from '../Pagination/Pagination'; 
import useStyles from './style';

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
console.log(products)
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Grid container justify="center" spacing={4}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  );
};

export default Products;
