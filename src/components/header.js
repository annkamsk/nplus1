import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.css"
import { css } from "@emotion/core"

const Header = ({ siteTitle }) => (
  <div className={styles.header}>
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link
          to="/"
          className={styles.title}>
          {siteTitle}
        </Link>
        <Link
          to="/about"
          className={styles.menuItem}
          css={css`
          float: right;
        `}>
          About
        </Link>
      </div>
    </header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: "Polish Lyrics"

}

export default Header

