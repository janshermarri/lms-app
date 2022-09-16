import { useState, useEffect } from 'react';
import {
    Tooltip,
    Divider,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Typography,
    Grid,
    CardContent,
    Box,
    Button,
    useTheme,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { getComments, deleteComment, isUserValid } from 'src/api/api';
import { useRouter } from 'next/router';
import { successToast, errorToast } from 'src/common/utils';
import { Visibility } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { editComment } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';

import 'react-quill/dist/quill.snow.css';



const CommentsTable = () => {
    const [comments, setComments] = useState<any>([]);
    const [editableComments, setEditableComments] = useState<any>([]);
    const [editableCommentId, setEditableCommentId] = useState<any>([]);
    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
    const [commentOperation, setCommentOperation] = useState<string>('Read');
    const router = useRouter();

    useEffect(() => {
        if (!isUserValid()) {
            router.push('/login');
        }
        getComments().then((data) => {
            setComments(data);
        })
    }, []);

    const handleDeleteComment = (commentId) => {
        console.log("deleteComment", commentId);
        deleteComment(commentId).then(resp => {
            if (resp.status === 200 || resp.status === 204) {
                console.log('closing dialog');
                successToast('Deleted comment successfully');
            }
            else {
                errorToast('Error deleting comment, try again!');
            }

        }).catch(err => {
            console.log(err);
            errorToast('Error deleting comment, try again!');
        })
    }

    const handleEditComment = (comment) => {
        console.log('Editing comment', comment);
        setEditableComments(comment.comments);
        setEditableCommentId(comment.id);
        setCommentOperation('Edit');
        setOpenCommentDialog(true);
    }

    const handleViewComment = (comment) => {
        console.log('Viewing comment', comment);
        setCommentOperation('Read');
        setOpenCommentDialog(true);
    }

    const handleCloseCommentDialog = () => {
        setOpenCommentDialog(false);
    }

    const handleCommentSubmit = () => {
        console.log('comment submit');
        console.log(editableCommentId, editableComments);
        const formValues = { id: editableCommentId, comments: editableComments }
        editComment(formValues).then(resp => {
            console.log(resp);
            if (resp.status === 200) {
                handleCloseCommentDialog();
                successToast('Edited comment successfully');
            }
            else {
                handleCloseCommentDialog();
                errorToast('Error editing comment, try again!');
            }

        }).catch(error => {
            console.log(error);
        })
    }


    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;


    const theme = useTheme();
    return (
        <>
            <Card>
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Session</TableCell>
                                <TableCell align="left">Comment</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.length > 0 && comments.map((comment) => {
                                return (
                                    <TableRow
                                        hover
                                        key={comment.id}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {comment.teacher_student_session.teacher.user.first_name} {comment.teacher_student_session.teacher.user.last_name} teaching {comment.teacher_student_session.student.user.first_name} {comment.teacher_student_session.student.user.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {comment.comments.substring(0, 60)}...
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="View" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => handleViewComment(comment)}

                                                >
                                                    <Visibility fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => handleEditComment(comment)}

                                                >
                                                    <EditTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': { background: theme.colors.error.lighter },
                                                        color: theme.palette.error.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => handleDeleteComment(comment.id)}

                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <div>
                <Dialog maxWidth={'md'} open={openCommentDialog} onClose={handleCloseCommentDialog}>
                    <DialogTitle>{`${commentOperation} Comment`}</DialogTitle>
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
                                                <ReactQuill theme="snow"
                                                    name="comments"
                                                    id="comments"
                                                    value={editableComments}
                                                    onChange={setEditableComments} readOnly={commentOperation === 'Read'} />
                                                <DialogActions>
                                                    <Button onClick={handleCloseCommentDialog}>Cancel</Button>
                                                    <Button color="primary" type="submit" onClick={handleCommentSubmit} disabled={commentOperation !== 'Edit'}>
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
};

export default CommentsTable;
