import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
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
import { createNewSession, getStudents, getTeachers } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { successToast, errorToast } from 'src/common/utils';

export default function NewSessionDialog({ openDialog, closeDialog}) {
    const [students, setStudents] = useState<any>(false);
    const [teachers, setTeachers] = useState<any>(false);
    const validationSchema = yup.object({
        teacher: yup.string().max(150, 'Teacher cant be greater than 150 characters').required('Teacher is required'),
        student: yup.string().max(150, 'Student cant be greater than 150 characters').required('Student is required'),

    });
    const formik = useFormik({
        initialValues: {
            id: '',
            teacher: '',
            student: '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formValues = { student_id: values.student, teacher_id: values.teacher };
            createNewSession(formValues).then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                    console.log('closing dialog');
                    closeDialog();
                    successToast('Created new session successfully.');
                }
                else {
                    closeDialog();
                    errorToast('Error creating a new session, try again later.');
                }

            }).catch(error => {
                console.log(error);
            })
        },
    });

    useEffect(() => {
        getTeachers().then((data) => {
            setTeachers(data);
        }).catch(err => {
            console.log("err", err);
        })
        getStudents().then((data) => {
            setStudents(data);
        }).catch(err => {
            console.log("err", err);
        })
    }, []);


    return (
        <>
            <div>
                <Dialog maxWidth={'md'} open={openDialog} onClose={closeDialog}>
                    <DialogTitle>New Session</DialogTitle>
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
                                        >
                                            <div>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="teacher-select-label">Teacher</InputLabel>
                                                        <Select
                                                            value={formik.values.teacher}
                                                            name="teacher"
                                                            label="Teacher"
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.teacher && Boolean(formik.errors.teacher)}

                                                        >
                                                            {teachers.length > 0 && teachers.map((teacher) => (
                                                                <MenuItem key={teacher.id} value={teacher.id}>
                                                                    {teacher.user.first_name} {teacher.user.last_name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="student-select-label">Student</InputLabel>
                                                        <Select
                                                            value={formik.values.student}
                                                            name="student"
                                                            label="Student"
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.student && Boolean(formik.errors.student)}
                                                        >
                                                            {students.length > 0 && students.map((student) => (
                                                                <MenuItem key={student.id} value={student.id}>
                                                                    {student.user.first_name} {student.user.last_name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
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
