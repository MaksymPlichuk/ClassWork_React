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
import { useDispatch } from "react-redux";

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
    title: "",
    description: "",
    image: "",
    rating: 0,
    publishDate: 2000,
};

const BookCreateForm = () => {
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const handleSubmit = (newBook) => {
        console.log(newBook);

        const bookUrl = import.meta.env.VITE_BOOKS_URL;

        const response = axios.post(bookUrl, newBook);
        dispatcher({ type: "createBook", payload: newBook })
        
        if (response.status == 200) {
            navigate("/books")
        }

    };

    const getError = (prop) => {
        return formik.touched[prop] && formik.errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {formik.errors[prop]}
            </Typography>
        ) : null;
    };

    const maxYear = new Date().getFullYear();
    const validationScheme = object({
        title: string()
            .required("Обов'язкове поле")
            .max(100, "Максимальна довжина 100 символів"),
        publishDate: number()
            .min(0, "Рік не може бути від'ємним")
            .max(maxYear, `Рік не може бути більшим за ${maxYear}`)
            .required("Обов'язкове поле"),
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
                        Додавання нової книги
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
                            <FormLabel htmlFor="title">Назва</FormLabel>
                            <TextField
                                name="title"
                                placeholder="Назва книги"
                                autoComplete="title"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("title")}
                        <FormControl>
                            <FormLabel htmlFor="description">Опис</FormLabel>
                            <TextField
                                name="description"
                                placeholder="Опис"
                                autoComplete="description"
                                fullWidth
                                variant="outlined"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("description")}
                        <FormControl>
                            <FormLabel htmlFor="image">Обкладинка</FormLabel>
                            <TextField
                                name="image"
                                placeholder="Обкладинка"
                                autoComplete="image"
                                fullWidth
                                variant="outlined"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="rating">Рейтинг</FormLabel>
                            <TextField
                                name="rating"
                                placeholder="РЕйтинг"
                                autoComplete="rating"
                                fullWidth
                                variant="outlined"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="publishDate">Рік</FormLabel>
                            <TextField
                                name="publishDate"
                                placeholder="Рік публікацї"
                                autoComplete="publishDate"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.publishDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {getError("publishDate")}
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
};

export default BookCreateForm;