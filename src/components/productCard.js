import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { AddToCart } from 'react-snipcart'
import { Link } from 'gatsby'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  margin: {},
})

const ProductCard = ({ classes, product }) => (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container justify="center" spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <Link to={product.url}>
              <img className={classes.img} alt="complex" src={product.image} />
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
                <Typography gutterBottom>{product.description}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                className={classes.margin}
                size="small"
              >
                <AddToCart data={product}>In winkelwagen</AddToCart>
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
)

export default withStyles(styles)(ProductCard)
