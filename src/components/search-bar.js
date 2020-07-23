import React from "react"
import styles from "./search-bar.module.css"

export default class SearchBar extends React.Component {

  render() {
    return (
      <div className={styles.searchContainer}>
        <input type="test" className={styles.search} placeholder="Szukaj..."/>
        <div className={styles.icons}>
          <div className={styles.gridWrapper}>
            <div className={styles.gridOne}/>
            <div className={styles.gridTwo}/>
            <div className={styles.gridThree}/>
            <div className={styles.gridFour}/>
          </div>
          <div className={styles.listWrapper}>
            <div className={styles.listOne}/>
            <div className={styles.listTwo}/>
            <div className={styles.listThree}/>
          </div>
        </div>
      </div>
    )
  }
}