import { Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import SideMenuLayout from '@/components/SideMenuLayout'

const Home: NextPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Inicial</title>
      </Head>
      <Box>
        <h1>Inicial</h1>
      </Box>
    </SideMenuLayout>
  )
}

export default Home
