import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from '@/components/Footer';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import SessionsTable from '@/content/Sessions/SessionsTable';
import NewSessionDialog from 'src/content/Sessions/NewSession';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successToast, errorToast } from 'src/common/utils';
import NewSessionCommentDialog from 'src/content/Sessions/NewSessionComment';

interface SessionProps {
  teacher: {};
  student: {};
}


function SessionsListing() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
  const [editSession, setEditSession] = useState<boolean>(false);
  const [editableSessionValues, setEditableSessionValues] = useState<SessionProps[]>([]);

  const handleDialogOpen = (editable: boolean = false) => {
    console.log('handleDialogOpen', editable);
    setEditSession(editable);
    if (!editable) {
      setEditableSessionValues([]);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCommentDialogOpen = (editable: boolean = false) => {
    console.log('handleDialogOpen', editable);
    setEditSession(editable);
    if (!editable) {
      setEditableSessionValues([]);
    }
    setOpenCommentDialog(true);
  };

  const handleCommentDialogClose = () => {
    setOpenCommentDialog(false);
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
        <title>Sessions</title>
      </Head>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Sessions
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => handleDialogOpen(false)}
            >
              Add new session
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
            <SessionsTable openDialog={handleDialogOpen} openCommentDialog={handleCommentDialogOpen} editableSessionValues={(values) => setEditableSessionValues(values)}/>
            <NewSessionDialog openDialog={openDialog} closeDialog={handleDialogClose} showStatus={handleShowStatus} editable={editSession} editableSessionValues={editableSessionValues}/>
            <NewSessionCommentDialog openCommentDialog={openCommentDialog} closeCommentDialog={handleCommentDialogClose} showStatus={handleShowStatus} editableSessionValues={editableSessionValues}/>

          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

SessionsListing.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default SessionsListing;
