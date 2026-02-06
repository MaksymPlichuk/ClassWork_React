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
import axios from "axios";



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
    name: "",
    birth_date: "",
    image: "",
};

const baseURL = import.meta.env.VITE_AUTHORS_URL;
const AuthorCreateForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (newAuthor) => {
        console.log(newAuthor);

        try {
            const resp = await axios.post(baseURL, newAuthor);
            if (resp.status == 200) {
                console.log("author Added");
                navigate("/authors")
            }
        } catch (error) {
            console.warn(error);
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
        name: string().required("Обов'язкове поле").max(100, "Максимальна довжина 100 символів"),
        birth_date: string().required("Обов'язкове поле").matches(/\d{4}-\d{2}-\d{2}/, "Тип введення yyyy-MM-dd")
    });

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validationScheme,
    });

    return (
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
                        Додавання автора
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
                            <FormLabel htmlFor="name">Ім'я</FormLabel>
                            <TextField
                                name="name"
                                placeholder="Ім'я автора"
                                autoComplete="name"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("name")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="birth_date">Дата народження</FormLabel>
                            <TextField
                                name="birth_date"
                                placeholder="Дата народження автора"
                                autoComplete="birth_date"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formik.values.birth_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("birth_date")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="image">Фото</FormLabel>
                            <TextField
                                name="image"
                                placeholder="Посилання на фото"
                                autoComplete="image"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>

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
    );
}
export default AuthorCreateForm;