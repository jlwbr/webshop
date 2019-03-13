import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Grid from '@material-ui/core/Grid'
import AddToCart from '../components/AddToCart'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DisqusThread from '../components/DisqusThread'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

export default function Template({
  data,
  location, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, excerpt } = markdownRemark
  const {
    id,
    name,
    price,
    image,
    specifications,
    description,
    inStock,
  } = frontmatter
  const product = { id, name, url: '/', price, image, description }
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <Layout classPrefix="pr">
      <Grid container spacing={24} style={{ marginTop: '1em', width: '100%' }}>
        <Grid item xs={3}>
          <img src={image} />
        </Grid>
        <Grid item xs={6}>
          <h1>{name}</h1>
          <Typography variant="subtitle1">&euro;{price}</Typography>
          <div style={{ padding: '1em 0' }}>
            {inStock && (
              <p
                style={{
                  border: '1px',
                  borderStyle: 'solid',
                  borderColor: '#090',
                  padding: '0 .5em',
                  marginBottom: '.25em',
                  color: '#090',
                  display: 'inline-block',
                }}
              >
                Op vooraad
              </p>
            )}
            {!inStock && (
              <p
                style={{
                  border: '1px',
                  borderStyle: 'solid',
                  borderColor: '#d12c2a',
                  padding: '0 .5em',
                  marginBottom: '.25em',
                  color: '#d12c2a',
                  display: 'inline-block',
                }}
              >
                Helaas, niet op vooraad!
              </p>
            )}
          </div>
          {inStock && (
            <Button variant="outlined" color="primary" size="small">
              <AddToCart data={product}>In winkelwagen</AddToCart>
            </Button>
          )}
          {!inStock && (
            <Button disabled variant="outlined" color="primary" size="small">
              <AddToCart data={product}>In winkelwagen</AddToCart>
            </Button>
          )}
        </Grid>
      </Grid>
      <Paper square>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Beschrijving" />
          <Tab label="Specificaties" />
          <Tab label="Reviews" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h1>Specificaties</h1>
                  </TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {specifications &&
                  specifications.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="right">{row[1]}</TableCell>
                    </TableRow>
                  ))}
                {!specifications && (
                  <center style={{ padding: '1em 0' }}>
                    <p
                      style={{
                        border: '1px',
                        borderStyle: 'solid',
                        borderColor: '#d12c2a',
                        padding: '0 .5em',
                        marginBottom: '.25em',
                        color: '#d12c2a',
                        display: 'inline-block',
                      }}
                    >
                      Geen specificaties gevonden!
                    </p>
                  </center>
                )}
              </TableBody>
            </Table>
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <DisqusThread id={id} title={name} path={location.pathname} />
          </TabContainer>
        )}
      </Paper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        id
        name
        price
        image
        specifications
        inStock
      }
    }
  }
`
