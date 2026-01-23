import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useNavigate } from "react-router";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "0px auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

const initValues = {
    username: "",
    password: ""
};

const LoginPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values)

        const localData = localStorage.getItem("credentianls");
        if (localData) {
            const origCreds = JSON.parse(localData);

            if (values.password == origCreds.password && values.username == origCreds.username) {
                localStorage.setItem("loggedState", JSON.stringify(true))
                navigate("/")

                window.location.reload();   //щоб заререндирити navbar >_<
            } else {
                alert("Wrong username or Password")
            }
        }
        else {
            localStorage.setItem("credentianls", JSON.stringify(values))
            navigate("/")
        }
    }

    const getError = (prop) => {
        return formik.touched[prop] && formik.errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {formik.errors[prop]}
            </Typography>
        ) : null;
    };

    const validationScheme = object({
        username: string().required("Обов'язкове поле").max(100, "Максимальна довжина 100 символів"),
        password: string().required("Обов'язкове поле").max(100, "Максимальна довжина 100 символів")
    });

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validationScheme,
    });
    return (
        <>
            <Box>
                <SignInContainer direction="column" justifyContent="space-between">
                    <Card variant="outlined">
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                width: "100%",
                                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                            }}
                        >
                            Login
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={formik.handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: 2,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="title">Username</FormLabel>
                                <TextField
                                    name="username"
                                    placeholder="john doe"
                                    autoComplete="username"
                                    autoFocus
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </FormControl>
                            {getError("username")}
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <TextField
                                    name="password"
                                    placeholder="Назва книги"
                                    autoComplete="password"
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </FormControl>
                            {getError("password")}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="error"
                            >
                                Додати
                            </Button>
                        </Box>
                    </Card>
                </SignInContainer>
            </Box>
        </>
    );
}
export default LoginPage;