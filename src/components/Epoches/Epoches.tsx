import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useQuery, gql } from '@apollo/client'

import { selectedStyle } from '../../app/utils'
import { epoch } from '../../app/types'
import HeaderButton from '../HeaderButton/HeaderButton'
import styles from './epoches.module.css'

const epochesQuery = `
  query GetEpoches($first: Int, $skip: Int, $orderBy: String = "startBlock", $orderDirection: String = "asc", $filter: Epoch_filter) {
    epoches(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, where: $filter) {
      id
      startBlock
      endBlock
      totalQueryFees
      totalRewards
    }
  }
`

const sortEpoches = (epoches: epoch[], sort: keyof epoch, isAscending: boolean) => {
  const sortedEpoches = epoches.sort((a, b) => {
    const numA = typeof a[sort] === 'string' ? parseInt(a[sort] as string) : a[sort]
    const numB = typeof b[sort] === 'string' ? parseInt(b[sort] as string) : b[sort]
    let value = 0
    if (numA < numB) {
      isAscending ? (value = -1) : (value = 1)
    }
    if (numB < numA) {
      isAscending ? (value = 1) : (value = -1)
    }
    return value
  })
  return sortedEpoches
}

const Epoches = ({ startBlock }: { startBlock: string }) => {
  const [sortField, setSortField] = useState('startBlock' as keyof epoch)
  const [isAscending, setIsAscending] = useState(true)

  const filter = startBlock ? { startBlock: parseInt(startBlock) } : {}

  const { loading, error, data, refetch, fetchMore } = useQuery(gql(epochesQuery), {
    variables: {
      first: 3,
      fetchPolicy: 'cache-and-network',
      filter: filter,
    },
  })

  React.useEffect(() => {
    refetch({ filter: filter })
  }, [startBlock])

  if (error) return <p>Error : {error.message}</p>

  const sortedEpoches =
    data?.epoches && sortEpoches([...data.epoches], sortField, isAscending)

  const handleSort = (field: keyof epoch) => {
    if (field === sortField) {
      setIsAscending(!isAscending)
    } else {
      setIsAscending(true)
    }
    setSortField(field)
  }

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.epoches.length,
      },
    })
  }

  return (
    <div>
      <table className={styles.epochsTable}>
        <thead>
          <tr>
            <HeaderButton
              field={'id'}
              isAscending={isAscending}
              sortField={sortField}
              handleSort={handleSort}
            >
              ID
            </HeaderButton>
            <HeaderButton
              field={'startBlock'}
              isAscending={isAscending}
              sortField={sortField}
              handleSort={handleSort}
            >
              START BLOCK
            </HeaderButton>
            <HeaderButton
              field={'endBlock'}
              isAscending={isAscending}
              sortField={sortField}
              handleSort={handleSort}
            >
              END BLOCK
            </HeaderButton>
            <HeaderButton
              field={'totalQueryFees'}
              isAscending={isAscending}
              sortField={sortField}
              handleSort={handleSort}
            >
              QUERY FEES
            </HeaderButton>
            <HeaderButton
              field={'totalRewards'}
              isAscending={isAscending}
              sortField={sortField}
              handleSort={handleSort}
            >
              TOTAL REWARDS
            </HeaderButton>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <></>
          ) : (
            sortedEpoches.map((epoch: any) => (
              <tr key={epoch.id}>
                <td className={`${styles[selectedStyle(sortField, 'id')]}`}>
                  {epoch.id}
                </td>
                <td className={`${styles[selectedStyle(sortField, 'startBlock')]}`}>
                  #{epoch.startBlock}
                </td>
                <td className={`${styles[selectedStyle(sortField, 'endBlock')]}`}>
                  #{epoch.endBlock}
                </td>
                <td className={`${styles[selectedStyle(sortField, 'totalQueryFees')]}`}>
                  {(+ethers.formatUnits(epoch.totalQueryFees, 18)).toFixed(0)} GRT
                </td>
                <td className={`${styles[selectedStyle(sortField, 'totalRewards')]}`}>
                  {(+ethers.formatUnits(epoch.totalRewards, 18)).toFixed(0)} GRT
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>
          Load More
        </button>
      </div>
    </div>
  )
}

export default Epoches
