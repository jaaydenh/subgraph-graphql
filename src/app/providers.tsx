'use client'

import { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        epoches: {
          keyArgs: false,
          merge(existing, incoming, { args }) {
            const skip = args?.skip || 0
            const merged = existing ? existing.slice(0) : []
            for (let i = 0; i < incoming.length; ++i) {
              merged[skip + i] = incoming[i]
            }
            return merged
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: process.env.NETWORK_HTTP_URI as string,
  cache: cache,
})

export function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
