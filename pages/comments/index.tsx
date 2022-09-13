import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, Button, Typography } from '@mui/material';
import Footer from '@/components/Footer';

import CommentsTable from '@/content/Comments/CommentsTable';
import NewCommentDialog from 'src/content/Comments/NewComment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successToast, errorToast } from 'src/common/utils';

interface CommentProps {
  session: {};
  comments: string;
}


function CommentsListing() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editableCommentValues, setEditableCommentValues] = useState<CommentProps[]>([]);

  const handleDialogOpen = (editable: boolean = false) => {
    console.log('handleDialogOpen', editable);
    setEditComment(editable);
    if (!editable) {
      console.log('not editable');
      setEditableCommentValues([]);
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
  console.log('setEditableCommentValues', editableCommentValues);

  return (
    <>
      <ToastContainer position='bottom-right' theme='dark'/>
      <Head>
        <title>Comments</title>
      </Head>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
            Comments
            </Typography>
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
            <CommentsTable openDialog={handleDialogOpen} editableCommentValues={(values) => setEditableCommentValues(values)}/>
            <NewCommentDialog openDialog={openDialog} closeDialog={handleDialogClose} showStatus={handleShowStatus} editable={editComment} editableCommentValues={editableCommentValues}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

CommentsListing.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default CommentsListing;
