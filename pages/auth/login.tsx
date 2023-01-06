import SinglePageLayout from "@/components/SinglePageLayout"
import Router from "next/router";
import { getProviders, signIn, useSession } from "next-auth/react"
import Loader from "@/components/Loader";
import { Box, Button, Link, Typography } from "@mui/material";

const SignIn = ({ providers, callbackUrl }: any) => {
  const { status } = useSession()

  if (status === "unauthenticated") {
    return (
      <SinglePageLayout>
        {Object.values(providers).map((provider: any) => (
          <Box key={provider.name} sx={{ textAlign: "center" }}>
            <Typography variant="h5" align="center" sx={{ pb: 5 }}>Bem vindo a Sparck</Typography>
            <Button variant="contained" size="large" onClick={() => signIn(provider.id)}>
              Entrar com {provider.name}
            </Button>
            <Typography variant="body2" align="center" sx={{ pt: 5 }}>Para acessar a ADIA, <Link href="https://home.luizsouza.com">clique aqui</Link>.</Typography>
          </Box>
        ))}
      </SinglePageLayout>
    )
  }

  if (status === "authenticated") {
    Router.push(callbackUrl);
  }

  return <Loader />
}

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders()
  const callbackUrl = context.query.callbackUrl || "/"
  return {
    props: { providers, callbackUrl },
  }
}

export default SignIn;
