import { Grid } from "@mui/material";
import UserMenu from "./UserMenu";

const TopMenu = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
                <UserMenu />
            </Grid>
        </Grid>
    )
}

export default TopMenu;