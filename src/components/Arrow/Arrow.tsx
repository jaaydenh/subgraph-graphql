import styles from './arrow.module.css'

const Arrow = ({ isAscending }: { isAscending: boolean }) => {
  return (
    <>
      {isAscending ? (
        <img className={styles.arrow} src="/images/Direction-Down.svg" alt="Down Arrow" />
      ) : (
        <img className={styles.arrow} src="/images/Direction-Up.svg" alt="Up Arrow" />
      )}
    </>
  )
}

export default Arrow
