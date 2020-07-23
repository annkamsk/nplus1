import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styles from "./table.module.css"
import SearchBar from "./search-bar"
import { generateLyricsExcerpt } from "../utils/parse-text"

export default function TableOfContents() {
  const data = useStaticQuery(
    graphql`
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
              excerptAst
            }
          }
        }
    }
   `)

  const toExcerpt = node => {
    const excerpt = generateLyricsExcerpt(node)
    const description = excerpt["desc"].split("\n")
    return {
      "title": excerpt["title"],
      "desc": description.map(line => (<div className={styles.description}>{line}<br/></div>))
    }
  }
  return (
    <div className={styles.container}>
      <SearchBar/>
      <div className={styles.entryContainer}>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Link to={node.fields.slug} className={styles.entry} key={node.id}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>
                {node.headings[0].value}
              </h3>
            </div>
            <div className={styles.description}>
              {toExcerpt(node)["desc"]}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

}
