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

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { getSessions, deleteSession, isUserValid } from 'src/api/api';
import { useRouter } from 'next/router';
import { successToast, errorToast, getUserInfo } from 'src/common/utils';



const SessionsTable = ({ openCommentDialog, sessionId }) => {
    const [sessions, setSessions] = useState<any>([]);
    const router = useRouter();
    const userInfo: any = getUserInfo();

    useEffect(() => {
        if (!isUserValid()) {
            router.push('/login');
        }
        getSessions().then((data) => {
            setSessions(data.records);
        })
    }, []);

    const handleDeleteSession = (sessionId) => {
        console.log("deleteSession", sessionId);
        deleteSession(sessionId).then(resp => {
            if (resp.status === 200 || resp.status === 204) {
                console.log('closing dialog');
                successToast('Deleted session successfully');
            }
            else {
                errorToast('Error deleting session, try again!');
            }

        }).catch(err => {
            console.log(err);
            errorToast('Error deleting session, try again!');
        })
    }

    const handleAddNewSessionComment = (session) => {
        console.log('Adding new session comment', session);
        sessionId(session.id);
        openCommentDialog(true);
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
                                <TableCell>Teacher</TableCell>
                                <TableCell>Student</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sessions.length > 0 && sessions.map((session) => {
                                return (
                                    <TableRow
                                        hover
                                        key={session.id}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {session.teacher.user.first_name} {session.teacher.user.last_name}
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
                                                {session.student.user.first_name} {session.student.user.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Add Comment" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => handleAddNewSessionComment(session)}

                                                >
                                                    <AddTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            {userInfo.group === 'admin' &&
                                                <Tooltip title="Delete" arrow>
                                                    <IconButton
                                                        sx={{
                                                            '&:hover': { background: theme.colors.error.lighter },
                                                            color: theme.palette.error.main
                                                        }}
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => handleDeleteSession(session.id)}

                                                    >
                                                        <DeleteTwoToneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            }
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

export default SessionsTable;
