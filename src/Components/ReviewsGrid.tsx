import { Grid } from "@chakra-ui/react";

export default function ReviewsGrid({ children }: { children?: React.ReactNode }) {
    return (
        <Grid
       
            templateColumns='repeat(auto-fit, minmax(280px, 1fr))'
            gap="1rem"
            justifyItems="center"
        >
            {children}
        </Grid>
    )
}