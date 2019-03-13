import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { AddToCart } from 'react-snipcart'
import { Link } from 'gatsby'

const ProductCard = ({ classes, product }) => {}
;<div
  style={{
    flexGrow: 1,
  }}
>
  <Paper
    style={{
      padding: 15,
      margin: 'auto',
    }}
  >
    <Grid container justify="center" spacing={16}>
      <Grid item>
        <ButtonBase
          style={{
            width: 128,
            height: 128,
          }}
        >
          <Link to={product.url}>
            <img
              style={{
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              alt="complex"
              src={product.image}
            />
          </Link>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={16}>
          <Grid item xs>
            <Link
              to={product.url}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <Typography gutterBottom variant="subtitle1">
                {product.name}
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" size="small">
              <AddToCart
                data={{
                  id: product.id,
                  name: product.name,
                  url: '/',
                  price: product.price,
                  image: product.image,
                  description: product.description,
                }}
              >
                In winkelwagen
              </AddToCart>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">€{product.price}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
</div>

export default ProductCard
