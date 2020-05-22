import React, { useContext } from "react";

import { CartContext } from "../../context/cart";

//Mui staff
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
//icons
import HighlightOff from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "space-between",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  nameQuantity: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  unit: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  price: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  delete: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.5rem",
    borderRadius: "50%",
  },
  button: {
    fontSize: "0.5rem",
  },
}));

const CartItem = (props) => {
  const classes = useStyles();
  const {
    item: { _id, name, quantity, unit, image, price },
  } = props;
  const context = useContext(CartContext);

  return (
    <div className={classes.root}>
      <Avatar variant="square" alt="Item" src={image} />
      <div className={classes.nameQuantity}>
        <div>{name}</div>
        <Typography variant="caption">{quantity}KG</Typography>
      </div>
      <div className={classes.unit}>
        <div>
          <button
            className={classes.button}
            onClick={() => context.increaseUnit(_id)}
          >
            +
          </button>
        </div>
        <div>{unit}</div>
        <div>
          <button
            className={classes.button}
            onClick={() => context.decreaseUnit(_id)}
          >
            -
          </button>
        </div>
      </div>
      <div className={classes.price}>
        <div>৳{price * unit}</div>
      </div>

      <div className={classes.delete}>
        <IconButton
          onClick={() => context.deleteProduct(_id)}
          aria-label="delete"
        >
          <HighlightOff color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
