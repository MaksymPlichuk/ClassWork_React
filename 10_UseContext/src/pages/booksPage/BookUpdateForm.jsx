import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { replace, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

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
    minHeight: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
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

const BookUpdateForm = () => {

    const [formValues, setFormValues] = useState({
        title: "",
        authorName: "",
        genre: "",
        year: "",
        coverUrl: ""
    })

    function onChangeHandle(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const { id } = useParams();


    const validate = () => {
        const validateErros = {};
        let result = true;

        if (formValues.title.length == 0) {
            validateErros.title = "Обов'язкове поле";
            result = false;
        } else if (formValues.title.length > 100) {
            validateErros.title = "Максимальна довжина 100 символів";
            result = false;
        }

        if (formValues.authorName.length > 100) {
            validateErros.authorName = "Максимальна довжина 100 символів";
            result = false;
        }

        if (formValues.genre.length == 0) {
            validateErros.genre = "Обов'язкове поле";
            result = false;
        } else if (formValues.genre.length > 50) {
            validateErros.genre = "Максимальна довжина 50 символів";
            result = false;
        }

        const maxYear = new Date().getFullYear();
        if (formValues.year.length == 0) {
            validateErros.year = "Обов'язкове поле";
            result = false;
        } else if (formValues.year < 0) {
            validateErros.year = "Рік не може бути від'ємним";
            result = false;
        } else if (formValues.year > maxYear) {
            validateErros.year = `Рік не може бути більшим за ${maxYear}`;
            result = false;
        }

        return { result: result, errors: validateErros }
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const validateRes = validate();

        if (!validateRes.result) {
            setErrors(validateRes.errors);
            return;
        } else {
            setErrors({});
        }

        const localData = localStorage.getItem("books");
        if (localData) {
            const books = JSON.parse(localData);
            const index = books.findIndex(b => b.id == id);
            books[index] = formValues;
            localStorage.setItem("books", JSON.stringify(books));
        }
        navigate("/books")
    };

    const getError = (prop) => {
        return errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {errors[prop]}
            </Typography>
        ) : null;
    };

    useEffect(() => {
        const localData = localStorage.getItem("books");
        if (localData) {
            const books = JSON.parse(localData);
            const book = books.find((b) => b.id == id);
            if (!book) {
                navigate("/books", { replace: true })
            }
            setFormValues(book);
        } else {
            navigate("/books", { replace: true })
        }
    }, [])

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
                        Редагування книги
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
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
                                value={formValues.title}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        {getError("title")}
                        <FormControl>
                            <FormLabel htmlFor="authorName">Автор</FormLabel>
                            <TextField
                                name="authorName"
                                placeholder="Автор"
                                autoComplete="authorName"
                                fullWidth
                                variant="outlined"
                                value={formValues.authorName}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        {getError("authorName")}
                        <FormControl>
                            <FormLabel htmlFor="genre">Жанр</FormLabel>
                            <TextField
                                name="genre"
                                placeholder="Жанр"
                                autoComplete="genre"
                                fullWidth
                                variant="outlined"
                                value={formValues.genre}
                                onChange={onChangeHandle}
                            />
                        </FormControl>
                        {getError("genre")}
                        <FormControl>
                            <FormLabel htmlFor="year">Рік</FormLabel>
                            <TextField
                                name="year"
                                placeholder="Рік публікацї"
                                autoComplete="year"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formValues.year}
                                onChange={onChangeHandle}
                            />
                            {getError("year")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="coverUrl">Обкладинка</FormLabel>
                            <TextField
                                name="coverUrl"
                                placeholder="Обкладинка"
                                autoComplete="coverUrl"
                                fullWidth
                                variant="outlined"
                                value={formValues.coverUrl}
                                onChange={onChangeHandle}
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
export default BookUpdateForm;