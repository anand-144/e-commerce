import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Grid, Typography, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';
import { Link } from 'react-router-dom';
import { LiaShoppingCartSolid, LiaRedoAltSolid } from "react-icons/lia";
import { GrNext } from "react-icons/gr";
import useStyles from './style';

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();
  const classes = useStyles();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  const options = shippingOptions.map((s0) => ({ id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})` }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    if (checkoutTokenId) {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    }
  };

  const fetchSubdivisions = async (countryCode) => {
    if (countryCode) {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    }
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    if (country && region) {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
      setShippingOptions(options);
      setShippingOption(options[0].id);
    }
  };

  useEffect(() => {
    if (checkoutToken) {
      fetchShippingCountries(checkoutToken.id);
    }
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name='firstName' label='First Name' />
            <FormInput required name='lastName' label='Last Name' />
            <FormInput required name='address1' label='Address' />
            <FormInput required name='mobile' label='Contact No' type='number' />
            <FormInput required name='email' label='Email' type='email' />
            <FormInput required name='city' label='City' />
            <FormInput required name='zip' label='Zip / Postal code' />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined' className={classes.button}>
              Back to Cart <LiaShoppingCartSolid className={classes.icon} />
            </Button>
            <Button type='reset' variant='contained' color='primary' onClick={() => methods.reset()} className={classes.button}>
              Reset Form <LiaRedoAltSolid className={classes.icon} />
            </Button>
            <Button type='submit' variant='contained' color='secondary' className={classes.button}>
              Next <GrNext className={classes.icon} />
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;
