import {
    Box,
    Button,
    Card,
    Typography,
    Container,
    styled,
    TextField,
    CircularProgress,
} from '@mui/material';
import Logo from 'src/components/LogoSign';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { login } from 'src/api/api';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
);

const TopWrapper = styled(Box)(
    () => `
    display: flex;
    width: 100%;
    flex: 1;
    padding: 10px;
  `
);

function LoginBasic() {
    const { t }: { t: any } = useTranslation();
    const router = useRouter();
    return (
        <>
            <ToastContainer />
            <MainContent>
                <TopWrapper>
                    <Container maxWidth="sm">
                        <Logo />
                        <Card
                            sx={{
                                mt: 3,
                                px: 4,
                                pt: 5,
                                pb: 3
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        mb: 1
                                    }}
                                >
                                    Sign in
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color="text.secondary"
                                    fontWeight="normal"
                                    sx={{
                                        mb: 3
                                    }}
                                >
                                    Fill in the fields below to sign into your account.
                                </Typography>
                            </Box>
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    username: Yup.string()
                                        .max(255)
                                        .required(t('The username field is required')),
                                    password: Yup.string()
                                        .max(255)
                                        .required(t('The password field is required')),
                                    terms: Yup.boolean().oneOf(
                                        [true],
                                        t('You must agree to our terms and conditions')
                                    )
                                })}
                                onSubmit={async (
                                    values,): Promise<void> => {
                                    try {
                                        console.log(values);
                                        login(values.username, values.password).then((resp) => {
                                            console.log("resp", resp);
                                            if (resp.status === 200) {
                                                toast.success("Login successful, redirecting you to the dashboard.", {
                                                    position: "top-right",
                                                    autoClose: 1500,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    });
                                                router.push('/dashboards/tasks');
                                            }
                                            else {
                                                toast.error("Unable to login, try again.", {
                                                    position: "top-right",
                                                    autoClose: 1500,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    });
                                                console.log("Unable to login, try again.");
                                            }
                                        }).catch(err => {
                                            console.log("err", err);
                                        });
                                    } catch (err) {
                                        console.log("Its an error!");
                                        console.error(err);
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    touched,
                                    values
                                }): JSX.Element => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <TextField
                                            error={Boolean(touched.username && errors.username)}
                                            fullWidth
                                            margin="normal"
                                            autoFocus
                                            helperText={touched.username && errors.username}
                                            label={t('Username')}
                                            name="username"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="text"
                                            value={values.username}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(touched.password && errors.password)}
                                            fullWidth
                                            margin="normal"
                                            helperText={touched.password && errors.password}
                                            label={t('Password')}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="password"
                                            value={values.password}
                                            variant="outlined"
                                        />
                                        <Box
                                            alignItems="center"
                                            display="flex"
                                            justifyContent="space-between"
                                        >
                                            {/* <Link component={RouterLink} to="/account/recover-password">
                                                <b>{t('Lost password?')}</b>
                                            </Link> */}
                                        </Box>
                                        <Button
                                            sx={{
                                                mt: 3
                                            }}
                                            color="primary"
                                            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                            disabled={isSubmitting}
                                            type="submit"
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                        >
                                            {t('Sign in')}
                                        </Button>
                                    </form>
                                )}
                            </Formik>

                        </Card>
                    </Container>
                </TopWrapper>
            </MainContent>
        </>
    );
}

export default LoginBasic;
