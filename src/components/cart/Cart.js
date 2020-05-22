import React, { useContext } from "react";

import { CartContext } from "../../context/cart";
import EditBillingAddress from "./EditBillingAddress";

import CartItem from "./CartItem";

//Mui staff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
//icons
import DeleteForever from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles({
  root: {
    marginLeft: "10px",
    minWidth: 300,
  },
  content: {},
});

const Cart = () => {
  const classes = useStyles();

  const context = useContext(CartContext);
  const isEmpty = context.products.length > 0 ? false : true;
  const grandTotal = context.products
    .map((product) => product.unit * product.price)
    .reduce((prev, next) => prev + next, 0);

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            aria-label="clear"
            onClick={() => context.deleteAll()}
            disabled={isEmpty}
          >
            <DeleteForever /> <Typography variant="body2">Clear</Typography>
          </IconButton>
        }
        title="Your Cart"
      />
      <Divider />
      <CardContent className={classes.content}>
        {context.products.map((product) => (
          <CartItem key={product._id} item={product} />
        ))}
      </CardContent>
      <CardActions>
        <EditBillingAddress disabled={isEmpty} />
        <Typography variant="body1">Grand Total: {grandTotal}</Typography>
      </CardActions>
    </Card>
  );
};

export default Cart;
