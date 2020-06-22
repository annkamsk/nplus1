import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styles from "./table.module.css"

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
    `
  )
  const toExcerpt = node => {
    const title = node.headings[0].value
    const children = node.excerptAst['children']

    const dfs = root => {
      if (root.type === "text") {
        return root.value;
      }
      return root.children.map(child => dfs(child)).filter(text => text && text.length > 0)
    }
    const par = children.find(n => n.tagName === "p")
    const desc = dfs(par)
    const results = []
    for (let i = 1; i < desc.length - 1; ++i) {
      if (desc[i].includes(":")) {
        results.push(desc[i - 1] + desc[i] + desc[i + 1])
      }
    }
    return {'title': title, 'desc': results.map(line => (
      <p className={styles.description}>{line}</p>
      ))}
  }

  return (
    <div className={styles.container}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div className={styles.entry} key={node.id}>
          <Link to={node.fields.slug}
                className={styles.title}>
            <h3>
              {node.headings[0].value}
            </h3>
          </Link>
          <div>
            { toExcerpt(node)['desc'] }
          </div>
        </div>
      ))}
    </div>
  )
}

