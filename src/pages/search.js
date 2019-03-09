import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import ProductList from '../components/productList'

import { Index } from 'elasticlunr'

// Graphql query used to retrieve the serialized search index.
export const query = graphql`
  query {
    siteSearchIndex {
      index
    }
    allMarkdownRemark(limit: 1000) {
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

// Search component
export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { query: ``, results: [] }
    this.search = this.search.bind(this)
  }

  componentWillMount() {
    this.search()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.search()
    }
  }

  render() {
    return (
      <div>
        <Layout searchValue={this.state.query}>
          <ProductList products={this.state.results} />
        </Layout>
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.data.siteSearchIndex.index) // Create an elastic lunr index and hydrate with graphql query results

  search = () => {
    if (this.props.location.search) {
      const url = this.props.location.search.split('?q=')[1].split('&')
      const query = url[0]
      this.index = this.getOrCreateIndex()
      console.log(query)
      this.setState({
        query,
        // Query the index with search string to get an [] of IDs
        results: this.index
          .search(query)
          // Map over each ID and return the full document
          .map(({ ref }) => this.index.documentStore.getDoc(ref)),
      })
    }
  }
}
