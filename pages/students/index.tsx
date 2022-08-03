import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from '@/components/Footer';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import StudentsTable from '@/content/Students/StudentsTable';

function StudentsListing() {
  return (
    <>
      <Head>
        <title>Teachers</title>
      </Head>
      <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Students
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add new student
        </Button>
      </Grid>
    </Grid>

      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <StudentsTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

StudentsListing.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default StudentsListing;
