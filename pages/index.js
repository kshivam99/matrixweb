import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios"

export default function Home(props) {
  console.log(props);
  return (
    <div className={styles.container}>
        Index
    </div>
  )
}
