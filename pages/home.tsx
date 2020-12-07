import { FC, useEffect, useState, useCallback } from 'react'
import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { Layout } from '@components/common'
import { Info } from '@components/icons'
import { Text, Container, Logo, Button, Input } from '@components/ui'
import { defatultPageProps } from '@lib/defaults'


export default function Home() {

  return (
    <Container>
    </Container>
  )
}

Home.Layout = Layout