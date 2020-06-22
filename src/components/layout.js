import React from "react"
import Header from "./header"
import Wave from "./wave"
import styles from "./layout.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header/>
      <Wave/>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  )
}