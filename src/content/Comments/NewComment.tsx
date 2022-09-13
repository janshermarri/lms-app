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
import { createNewComment, editComment } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function NewCommentDialog({ openDialog, closeDialog, showStatus, editable, editableCommentValues }) {
    const [commentsContent, setCommentsContent] = useState('');
    useEffect(() => {
        console.log('editable', editable);
        if (editable) {
            setCommentsContent(editableCommentValues);
        }
    }, [commentsContent]);
    console.log('dialog setEditableCommentValues', editableCommentValues);
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
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
                                                <ReactQuill theme="snow" value={commentsContent} onChange={setCommentsContent} />
                                                <DialogActions>
                                                    <Button onClick={closeDialog}>Cancel</Button>
                                                    <Button color="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </DialogActions>
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
