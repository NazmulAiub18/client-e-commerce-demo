import React, { useContext, useState } from "react";
import axios from "axios";

import { CartContext } from "../../context/cart";
//Mui staff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  successText: {
    color: "green",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

const EditBillingAddress = (props) => {
  const classes = useStyles();
  const context = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState({});
  const [success, setSuccess] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setDone(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDone(false);
    setError("");
    setServerError({});
    setSuccess("");
  };

  const handleChange = (e) => {
    setBillingAddress(e.target.value);
    setDone(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (billingAddress.trim() === "") {
      setError("Billing Address Is Required!");
      setDone(true);
      return;
    }
    setError("");
    const order = {
      billingAddress,
      products: context.products.map((product) => ({
        productId: product._id,
        unit: product.unit,
      })),
    };
    axios
      .post("/order", order)
      .then((res) => {
        setDone(true);
        setServerError({});
        setBillingAddress("");
        setSuccess(res.data);
      })
      .catch((err) => {
        setDone(false);
        setServerError(err.response.data);
        setSuccess("");
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        disabled={props.disabled}
      >
        Place Order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Billing Address</DialogTitle>
        <div className={classes.successText}>
          <strong>{success}</strong>
        </div>
        <div className={classes.errorText}>
          <strong>{serverError.billingAddress}</strong>
        </div>
        <div className={classes.errorText}>
          <strong>{serverError.products}</strong>
        </div>
        <div className={classes.errorText}>
          <strong>{serverError.general}</strong>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please Enter Your Billing Address So That We Can Start Delivery
              Process As Soon As Possible.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="billingAddress"
              label="Billing Address"
              type="billingAddress"
              onChange={handleChange}
              helperText={error}
              error={!!error}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={done}
            >
              Submit
            </Button>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditBillingAddress;
