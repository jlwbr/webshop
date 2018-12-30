import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'typeface-roboto'
import Header from './header'
import './layout.css'
import 'rc-slider/assets/index.css'

const Layout = ({ children, noContainer }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          link={[
            {
              href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
              rel: 'stylesheet',
              type: 'text/css',
            },
            {
              href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
              rel: 'stylesheet',
              type: 'text/css',
            },
            {
              href:
                'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
              rel: 'stylesheet',
              type: 'text/css',
            },
          ]}
          script={[
            {
              type: 'text/javascript',
              src:
                'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
            },
            {
              type: 'text/javascript',
              url: '',
              id: 'snipcart',
              'data-api-key':
                'YjdiNWIyOTUtZTIyMy00MWMwLTkwNDUtMzI1M2M2NTgxYjE0',
              src: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        {!noContainer ? (
          <div
            style={{
              margin: '0 auto',
              maxWidth: 1260,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
            }}
          >
            {children}
          </div>
        ) : (
          <div>{children}</div>
        )}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
