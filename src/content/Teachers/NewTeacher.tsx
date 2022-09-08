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
import { createNewTeacher, editTeacher } from 'src/api/api';
import 'react-toastify/dist/ReactToastify.css';


export default function NewTeacherDialog({ openDialog, closeDialog, showStatus, editable, editableTeacherValues }) {
    const validationSchema = yup.object({
        username: yup.string().max(15, 'Username cant be greater than 15 characters').required('Username is required'),
        password: editable ? yup
            .string() : yup
                .string()
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
        first_name: yup.string().max(15, 'First name cant be greater than 15 characters').required('First name is required'),
        last_name: yup.string().max(15, 'Last name cant be greater than 15 characters').required('Last name is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        address: yup.string().max(150, 'Address cant be greater than 150 characters').required('Address is required'),
        contact: yup.string().max(20, 'Contact cant be greater than 20 characters').required('Contact is required'),
        qualifications: yup.string().max(20, 'Qualilifications cant be greater than 100 characters'),

    });

    const formik = useFormik({
        initialValues: {
            id: '',
            username: editable ? editableTeacherValues.user.username : '',
            password: '',
            first_name: editable ? editableTeacherValues.user.first_name : '',
            last_name: editable ? editableTeacherValues.user.last_name : '',
            email: editable ? editableTeacherValues.user.email : '',
            address: editable ? editableTeacherValues.address : '',
            contact: editable ? editableTeacherValues.contact : '',
            qualifications: editable ? editableTeacherValues.qualifications : '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            if (editable) {
                values.id = editableTeacherValues.id;
                editTeacher(values).then(resp => {
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
                createNewTeacher(values).then(resp => {
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
                    <DialogTitle>{editable ? 'Edit Teacher' : 'New Teacher'}</DialogTitle>
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
                                                        id="username"
                                                        name="username"
                                                        label="Username"
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                                        helperText={formik.touched.username && formik.errors.username}
                                                    />
                                                    <TextField
                                                        id="password"
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                                        helperText={formik.touched.password && formik.errors.password}
                                                    />
                                                    <TextField
                                                        id="first_name"
                                                        name="first_name"
                                                        label="First Name"
                                                        value={formik.values.first_name}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                                        helperText={formik.touched.first_name && formik.errors.first_name}
                                                    />
                                                    <TextField
                                                        id="last_name"
                                                        name="last_name"
                                                        label="Last Name"
                                                        value={formik.values.last_name}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                                        helperText={formik.touched.last_name && formik.errors.last_name}
                                                    />
                                                    <TextField
                                                        id="email"
                                                        name="email"
                                                        label="Email"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                                        helperText={formik.touched.email && formik.errors.email}
                                                    />
                                                    <TextField
                                                        id="address"
                                                        name="address"
                                                        label="Address"
                                                        value={formik.values.address}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                                        helperText={formik.touched.address && formik.errors.address}
                                                    />
                                                    <TextField
                                                        id="contact"
                                                        name="contact"
                                                        label="Contact"
                                                        value={formik.values.contact}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.contact && Boolean(formik.errors.contact)}
                                                        helperText={formik.touched.contact && formik.errors.contact}
                                                    />
                                                    <TextField
                                                        id="qualifications"
                                                        name="qualifications"
                                                        label="Qualifications"
                                                        value={formik.values.qualifications}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.qualifications && Boolean(formik.errors.qualifications)}
                                                        helperText={formik.touched.qualifications && formik.errors.qualifications}
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
