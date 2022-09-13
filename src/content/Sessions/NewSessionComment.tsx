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
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createNewComment } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';

import 'react-quill/dist/quill.snow.css';

export default function NewSessionComment({ openCommentDialog, closeCommentDialog, showStatus, editableSessionValues }) {
    const [commentsContent, setCommentsContent] = useState('');

    const validationSchema = yup.object({
        comments: yup.string().required().max(150, 'Comments cant be greater than 3000 characters').required('Comments are required'),
    });
    const formik = useFormik({
        initialValues: {
            comments: '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);

        },
    });

    const submitComment = () => {
        const formValues = { session_id: editableSessionValues.id, comments: commentsContent };
        console.log('submitComment', formValues);
        createNewComment(formValues).then(resp => {
            console.log(resp);
            if (resp.status === 200) {
                console.log('closing dialog');
                closeCommentDialog();
                showStatus('success');
            }
            else {
                closeCommentDialog();
                showStatus('error');
            }

        }).catch(error => {
            console.log(error);
        })
    }

    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
    return (
        <>
            <div>
                <Dialog maxWidth={'md'} open={openCommentDialog} onClose={closeCommentDialog}>
                    <DialogTitle>New Session Comment</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={6}
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
                                                <ReactQuill theme="snow" value={commentsContent} onChange={setCommentsContent}/>
                                                <DialogActions>
                                                    <Button onClick={closeCommentDialog}>Cancel</Button>
                                                    <Button color="primary" type="submit" onClick={submitComment}>
                                                        Submit
                                                    </Button>
                                                </DialogActions>

                                                {/* <form onSubmit={formik.handleSubmit}>
                                                <TextField
                                                        id="comments"
                                                        name="comments"
                                                        label="Comments"
                                                        value={formik.values.comments}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.comments && Boolean(formik.errors.comments)}
                                                        helperText={formik.touched.comments && formik.errors.comments}
                                                    />
                                                    <DialogActions>
                                                        <Button onClick={closeCommentDialog}>Cancel</Button>
                                                        <Button color="primary" type="submit">
                                                            Submit
                                                        </Button>
                                                    </DialogActions>
                                                </form> */}
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
