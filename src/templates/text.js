import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./text.module.css"
import { generateLyricsExcerpt, splitIntoPolishAndOriginalLyrics } from "../utils/parse-text"

export default function Text({ data }) {
  const node = data.markdownRemark
  const excerpt = generateLyricsExcerpt(node)
  const title = excerpt.title
  const slug = node.fields.slug
  const lyrics = splitIntoPolishAndOriginalLyrics(node)
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link>
          >
          <Link to={slug}>{title}</Link>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.contentPL} dangerouslySetInnerHTML={{ __html: lyrics[0] }} />
          <div className={styles.contentOrig} dangerouslySetInnerHTML={{ __html: lyrics[1] }}>

          </div>
        </div>
      </div>

    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerptAst
      headings(depth: h3) {
        value
      }
      fields {
        slug 
      }
    }
  }  
`