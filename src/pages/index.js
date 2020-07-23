import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TableOfContents from "../components/table-of-contents"
import "./index.css"
require('typeface-lato')
require('typeface-roboto-slab')

export default function Home({ data }) {
  return (
    <Layout>
      <TableOfContents>
        {data}
      </TableOfContents>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          headings(depth: h3) {
            value
          }
          excerpt
        }
      }
    }
  }
`