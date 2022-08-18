import { Box, styled } from "@mui/material"
import { PropsWithChildren } from "react"

const SinglePage = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const SinglePageLayout: any = ({ children }: PropsWithChildren<{}>) => {
    return (
        <SinglePage>
            {children}
        </SinglePage>
    )
}

export default SinglePageLayout
