import { useState, useEffect } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from '@/components/Footer';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import TeachersTable from '@/content/Teachers/TeachersTable';
import NewTeacherDialog from 'src/content/Teachers/NewTeacher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successToast, errorToast } from 'src/common/utils';

interface TeacherProps {
  user: {};
  address: string;
  contact: string;
  qualifications: string;
}


function TeachersListing() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editTeacher, setEditTeacher] = useState<boolean>(false);
  const [editableTeacherValues, setEditableTeacherValues] = useState<TeacherProps[]>([]);

  const handleDialogOpen = (editable: boolean = false) => {
    console.log('handleDialogOpen', editable);
    setEditTeacher(editable);
    if (!editable) {
      setEditableTeacherValues([]);
    }
    setOpenDialog(true);
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
        <title>Teachers</title>
      </Head>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Teachers
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => handleDialogOpen(false)}
            >
              Add new teacher
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
            <TeachersTable openDialog={handleDialogOpen} editableTeacherValues={(values) => setEditableTeacherValues(values)}/>
            <NewTeacherDialog openDialog={openDialog} closeDialog={handleDialogClose} showStatus={handleShowStatus} editable={editTeacher} editableTeacherValues={editableTeacherValues}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

TeachersListing.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default TeachersListing;
