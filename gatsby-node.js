/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { updateFilter } = require(`./src/content/data/filters`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const productPage = path.resolve(`./src/templates/productTemplate.js`)
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    type
                    filters
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create pages.
        const pages = result.data.allMarkdownRemark.edges

        pages.forEach(page => {
          if (page.node.frontmatter.type === 'product') {
            createPage({
              path: '/p' + page.node.fields.slug,
              component: productPage,
              context: {
                slug: page.node.fields.slug,
              },
            })
            page.node.frontmatter.filters.forEach(filter => {
              console.log(updateFilter(filter[0], filter[1]))
            })
          }
        })
      })
    )
  })
}
