import React from 'react'
import { graphql } from 'gatsby'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Layout from '../components/layout'
import ProductList from '../components/productList'
import banner from '../images/Banner_SH.png'

/* eslint-disable */
const IndexPage = ({ data, location }) => (
  <Layout noContainer classPrefix="in">
    <Carousel
      showArrows={true}
      autoPlay
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
    >
      <div>
        <img src={banner} />
      </div>
    </Carousel>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1260,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <ProductList
        products={data.allMarkdownRemark.edges.map((node, i) => {
          const { id, name, price, image, description } = node.node.frontmatter
          const product = {
            id,
            name,
            url: location.origin,
            price,
            image,
            description,
          }
          return product
        })}
      />
    </div>
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___id] }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            id
            name
            price
            image
            review
          }
        }
      }
    }
  }
`

export default IndexPage
