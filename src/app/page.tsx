'use client'

import { useState } from 'react'

import Epochs from '../components/Epoches/Epoches'
import styles from './index-page.module.css'
import Search from '../components/Search/Search'

export default function IndexPage() {
  const [startBlock, setStartBlock] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartBlock(e.target.value)
  }

  return (
    <main className={styles.container}>
      <div>
        <h1 className={styles.header}>
          <span className={styles.title}>Epochs</span>
          <span className={styles.verticalLine}></span>
          <label className={styles.label}>
            <Search handleChange={handleChange} />
          </label>
        </h1>
      </div>
      <Epochs startBlock={startBlock} />
    </main>
  )
}
