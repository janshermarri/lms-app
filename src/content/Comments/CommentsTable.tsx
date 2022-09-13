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
    useTheme,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { getComments, deleteComment, isUserValid } from 'src/api/api';
import { useRouter } from 'next/router';
import { successToast, errorToast } from 'src/common/utils';
import { Visibility } from '@mui/icons-material';



const CommentsTable = ({ openDialog, editableCommentValues, setCommentAction }) => {
    const [comments, setComments] = useState<any>([]);
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
            if (resp.status === 200) {
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
        editableCommentValues(comment);
        setCommentAction('Edit');
        openDialog(true);
    }

    const handleViewComment = (comment) => {
        console.log('Viewing comment', comment);
        editableCommentValues(comment);
        setCommentAction('Read');
        openDialog(true);
    }


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
                                                {comment.comments}
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
        </>
    );
};

export default CommentsTable;
