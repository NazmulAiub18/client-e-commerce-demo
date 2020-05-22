import React, { useEffect, useState } from "react";
import axios from "axios";
//Mui staff
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Product from "../components/product/Product";
import Cart from "../components/cart/Cart";

const useStyles = makeStyles({
  text: {
    margin: "18px",
    fontSize: 24,
  },
});

const Home = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        setProducts([]);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={9} sm={7}>
          <Typography className={classes.text}>Your Product</Typography>
          <Divider />
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product._id} item xs={12} sm={4}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Grid container spacing={2}>
            <Grid item>
              <Cart />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </Grid>
  );
};

export default Home;
