import React from "react"
import { graphql} from "gatsby"
import Layout from "../components/layout"
import styles from "./text.module.css"

export default function Text({ data }) {
  const text = data.markdownRemark
  return (
    <Layout>
      <div className={styles.content}>
        <h1>{text.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: text.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }  
`