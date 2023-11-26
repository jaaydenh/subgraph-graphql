import styles from './search.module.css'

const Search = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Search"
      className={styles.searchInput}
    ></input>
  )
}

export default Search
