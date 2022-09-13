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



const CommentsTable = ({ openDialog, editableCommentValues }) => {
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
                                <TableCell>Comment</TableCell>
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
                                                {comment.teacher_student_session.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
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
