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
import { getStudents } from 'src/api/api';



const StudentsTable = () => {
    const [students, setStudents] = useState<any>([]);

    useEffect(() => {
        getStudents().then((data) => {
            setStudents(data);
        })
    }, []);

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
                            <TableCell>Guardian</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => {
                            return (
                                <TableRow
                                    hover
                                    key={student.user.id}
                                >
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {student.user.first_name} {student.user.last_name}
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
                                            {student.user.email}
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
                                            {student.address}
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
                                            {student.contact}
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
                                            {student.guardian}
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

export default StudentsTable;
