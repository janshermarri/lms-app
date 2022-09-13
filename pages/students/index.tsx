import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from '@/components/Footer';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import StudentsTable from '@/content/Students/StudentsTable';
import NewStudentDialog from 'src/content/Students/NewStudent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successToast, errorToast } from 'src/common/utils';

interface StudentProps {
  user: {};
  address: string;
  contact: string;
  guardian: string;
}


function StudentsListing() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editStudent, setEditStudent] = useState<boolean>(false);
  const [editableStudentValues, setEditableStudentValues] = useState<StudentProps[]>([]);


  const handleDialogOpen = (editable: boolean = false) => {
    setOpenDialog(true);
    setEditStudent(editable);

  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleShowStatus = (status) => {
    if (status === "success") {
      successToast('Created new record successfully!') 
    }
    else {
      errorToast('Error creating a new record, try again!');
    } 
  }


  return (
    <>
      <ToastContainer position='bottom-right' theme='dark'/>
      <Head>
        <title>Students</title>
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
              onClick={() => handleDialogOpen(false)}
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
            <StudentsTable openDialog={handleDialogOpen} editableStudentValues={(values) => setEditableStudentValues(values)} />
            <NewStudentDialog openDialog={openDialog} closeDialog={handleDialogClose} showStatus={handleShowStatus} editable={editStudent} editableStudentValues={editableStudentValues} />

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
