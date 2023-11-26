import Arrow from '../Arrow/Arrow'
import { selectedStyle, selectedHeaderStyle } from '../../app/utils'
import { epoch } from '../../app/types'
import styles from './headerButton.module.css'

const HeaderButton = ({
  field,
  children,
  isAscending,
  sortField,
  handleSort,
}: {
  field: string
  children: React.ReactNode
  isAscending: boolean
  sortField: string
  handleSort: (field: keyof epoch) => void
}) => {
  return (
    <th className={`${styles.header} ${styles[selectedHeaderStyle(sortField, field)]}`}>
      <button
        type="button"
        className={`${styles.headerButton} ${styles[selectedStyle(sortField, field)]}`}
        onClick={() => handleSort(field as keyof epoch)}
      >
        {children}
        {sortField === field && <Arrow isAscending={isAscending} />}
      </button>
    </th>
  )
}

export default HeaderButton
