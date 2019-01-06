import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import { AddToCart } from 'react-snipcart'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'

export default function Template({
  data,
  location, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, excerpt } = markdownRemark
  const { id, name, price, image, review } = frontmatter
  const { href } = location
  const product = { id, name, url: href, price, image, description: excerpt }
  return (
    <Layout classPrefix="pr">
      <Grid container spacing={24} style={{ marginTop: '1em', width: '100%' }}>
        <Grid item xs={3}>
          <img src={image} />
        </Grid>
        <Grid item xs={6}>
          <h1>{name}</h1>
          <Typography variant="subtitle1">&euro;{price}</Typography>

          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Button variant="outlined" color="primary" size="small">
            <AddToCart data={product}>In winkelwagen</AddToCart>
          </Button>
        </Grid>
        <Grid item xs={3}>
          <List dense={true}>
            {review.map((review, i) => (
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={review} key={i} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 280)
      html
      frontmatter {
        id
        name
        price
        image
        review
      }
    }
  }
`
