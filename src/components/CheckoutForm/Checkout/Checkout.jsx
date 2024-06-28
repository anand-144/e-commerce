import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, Divider, Button } from '@material-ui/core';
import { Puff } from 'react-loader-spinner';
import useStyles from './style';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

import { LiaPrayingHandsSolid } from "react-icons/lia";

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error, handleEmptyCart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart.id) {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error generating token:', error);
        setLoading(false);
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () => (
    <>
    <div>
      <Typography variant='h6'> Thank You for your purchase < LiaPrayingHandsSolid style={{fontSize: '2rem' , marginBottom:'-0.2rem' , paddingTop: '1rem' }}/></Typography>
      <Divider className={classes.subtitle} />
    </div>
    <br />
    <Button component={Link} to= '/' variant='outlined' type='button'>Order More</Button>
    </>
  )

  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        handleEmptyCart={handleEmptyCart} // Pass handleEmptyCart to PaymentForm
      />;

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {loading ? (
            <div className="loader-container">
              <Puff color="#00BFFF" height={100} width={100} />
            </div>
          ) : (
            activeStep === steps.length ? <Confirmation /> : (checkoutToken && <Form />)
          )}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
