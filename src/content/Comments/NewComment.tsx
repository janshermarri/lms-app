import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import Box from '@mui/material/Box';
import { editComment } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';

import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';


export default function NewCommentDialog({ openDialog, closeDialog, showStatus, commentAction, editableCommentValues }) {
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    const formik = useFormik({
        initialValues: {
            id: '',
            comments: '',
        },
        enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(formik.values.comments);
            console.log('formik Submit');
            console.log('values', values);
        },
    });

    const submitComment = () => {
        const formValues = { id: editableCommentValues.id, comments: formik.values.comments };
        console.log('submitComment', formValues);

        return;
        if (commentAction === 'Edit') {
            editComment(formValues).then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                    console.log('closing dialog');
                    closeDialog();
                    showStatus('success');
                }
                else {
                    closeDialog();
                    showStatus('error');
                }

            }).catch(error => {
                console.log(error);
            })
        }
    }

    // write all console logs here...
    console.log('commentAction', commentAction);
    console.log('commentValues', formik.values.comments);
    return (
        <>
            <div>
                <Dialog maxWidth={'md'} open={openDialog} onClose={closeDialog}>
                    <DialogTitle>{`${commentAction} Comment`}</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                '& .MuiTextField-root': { m: 1, width: '25ch' }
                                            }}
                                            width="700px"
                                        >
                                            <div>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <ReactQuill theme="snow"
                                                        name="comments"
                                                        id="comments"
                                                        value={formik.values.comments}
                                                        onChange={formik.handleChange} readOnly={commentAction === 'Read'} />
                                                    <DialogActions>
                                                        <Button onClick={closeDialog}>Cancel</Button>
                                                        <Button color="primary" type="submit" disabled={commentAction !== 'Edit'}>
                                                            Submit
                                                        </Button>
                                                    </DialogActions>
                                                </form>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
