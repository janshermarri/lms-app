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
import { getTeachers, deleteTeacher, isUserValid } from 'src/api/api';
import { successToast, errorToast } from 'src/common/utils';
import { useRouter } from 'next/router';


const TeachersTable = ({ openDialog, editableTeacherValues }) => {
    const [teachers, setTeachers] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        if (!isUserValid()) {
            router.push('/login');
        }
        getTeachers().then((data) => {
            setTeachers(data);
        }).catch(err => {
            console.log("err", err);
        })
    }, []);

    const handleDeleteTeacher = (teacherId) => {
        console.log("deleteTeacher", teacherId);
        deleteTeacher(teacherId).then(resp => {
            if (resp.status === 200) {
                console.log('closing dialog');
                successToast('Deleted teacher successfully');
            }
            else {
                errorToast('Error deleting teacher, try again!');
            }

        }).catch(err => {
            console.log(err);
            errorToast('Error deleting teacher, try again!');
        })
    }

    const handleEditTeacher = (teacher) => {
        console.log('Editing teacher', teacher);
        editableTeacherValues(teacher);
        openDialog(true);
    }

    const theme = useTheme();
    return (
        <Card>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Qualifications</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.length > 0 && teachers.map((teacher) => {
                            return (
                                <TableRow
                                    hover
                                    key={teacher.user.id}
                                >
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {teacher.user.first_name} {teacher.user.last_name}
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
                                            {teacher.user.email}
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
                                            {teacher.address}
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
                                            {teacher.contact}
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
                                            {teacher.qualifications}
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
                                                onClick={() => handleEditTeacher(teacher)}
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
                                                onClick={() => handleDeleteTeacher(teacher.user.id)}
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
    );
};

export default TeachersTable;
