import React from 'react'
import { graphql } from 'gatsby'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Layout from '../components/layout'
import ProductList from '../components/productList'

/* eslint-disable */
const IndexPage = ({ data }) => (
  <Layout noContainer classPrefix="in">
    <Carousel
      showArrows={true}
      autoPlay
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
    >
      <div>
        <img src="https://via.placeholder.com/1080x400" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1080x400" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1080x400" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1080x400" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1080x400" />
      </div>
      <div>
        <img src="https://via.placeholder.com/1080x400" />
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
      <ProductList products={data} />
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
          excerpt(pruneLength: 40)
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
