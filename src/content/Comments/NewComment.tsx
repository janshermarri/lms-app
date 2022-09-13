import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import { createNewComment, editComment } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';


export default function NewCommentDialog({ openDialog, closeDialog, showStatus, editable, editableCommentValues }) {
    const validationSchema = yup.object({
        comments: yup.string().max(3000, 'Comments cant be greater than 2000 characters').required('Comments are required'),

    });

    const formik = useFormik({
        initialValues: {
            id: '',
            session: '',
            comments: editable ? editableCommentValues.comments : '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            if (editable) {
                values.id = editableCommentValues.id;
                editComment(values).then(resp => {
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
            else {
                createNewComment(values).then(resp => {
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
        },
    });
    return (
        <>
            <div>
                <Dialog maxWidth={'md'} open={openDialog} onClose={closeDialog}>
                    <DialogTitle>{editable ? 'Edit Comment' : 'New Comment'}</DialogTitle>
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
                                        >
                                            <div>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <TextField
                                                        id="session"
                                                        name="session"
                                                        label="Session"
                                                        value={formik.values.session}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.session && Boolean(formik.errors.session)}
                                                        helperText={formik.touched.session && formik.errors.session}
                                                    />
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
                                                        <Button onClick={closeDialog}>Cancel</Button>
                                                        <Button color="primary" type="submit">
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
