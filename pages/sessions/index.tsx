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
import { getUserInfo } from '@/common/utils';

interface SessionProps {
  teacher: {};
  student: {};
}


function SessionsListing() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<number>();
  const userInfo: any = getUserInfo();

  const handleSessionDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCommentDialogOpen = (editable: boolean = false) => {
    console.log('handleCommentDialogOpen', editable);
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
        {userInfo.group === 'admin' &&
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleSessionDialogOpen}
            >
              Add new session
            </Button>
          </Grid>
}
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
            <SessionsTable openCommentDialog={handleCommentDialogOpen} sessionId={(sessionId) => setSessionId(sessionId)}/>
            <NewSessionDialog openDialog={openDialog} closeDialog={handleDialogClose}/>
            <NewSessionCommentDialog openCommentDialog={openCommentDialog} closeCommentDialog={handleCommentDialogClose} sessionId={sessionId}/>

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
