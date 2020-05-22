import React, { useContext } from "react";

import { CartContext } from "../../context/cart";
//Mui-staff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";

//icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Done from "@material-ui/icons/Done";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    minHeight: 200,
  },
  media: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    position: "relative",
  },
  cart: {
    marginLeft: "auto !important",
  },
  heart: {
    position: "absolute",
    top: "1%",
    left: "80%",
  },
});

const Product = (props) => {
  const classes = useStyles();
  const { product } = props;

  const context = useContext(CartContext);
  const isInCart = context.products.find((p) => p._id === product._id)
    ? true
    : false;

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
          <IconButton
            color="primary"
            className={classes.heart}
            aria-label="favorite"
          >
            {isInCart ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Quantity: {product.quantity}KG
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography gutterBottom variant="h5" component="h3">
            ৳{product.price}
          </Typography>
          {isInCart ? (
            <Fab
              className={classes.cart}
              color="primary"
              aria-label="add"
              disabled
            >
              <Done />
            </Fab>
          ) : (
            <Fab
              className={classes.cart}
              color="primary"
              aria-label="add"
              onClick={() => context.addProduct(product)}
            >
              <ShoppingCart />
            </Fab>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
