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


const AuthorUpdateForm = () => {

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        country: "",
        imageUrl: "",
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

        if (formValues.firstName.length == 0) {
            validateErros.firstName = "Обов'язкове поле";
            result = false;
        } else if (formValues.firstName.length > 100) {
            validateErros.firstName = "Максимальна довжина 100 символів";
            result = false;
        }

        if (formValues.lastName.length == 0) {
            validateErros.lastName = "Обов'язкове поле";
            result = false;
        } else if (formValues.lastName.length > 100) {
            validateErros.lastName = "Максимальна довжина 100 символів";
            result = false;
        }

        const birthdayRegex = /\d{4}-\d{2}-\d{2}/;
        if (formValues.birthday.length == 0) {
            validateErros.birthday = "Обов'язкове поле";
            result = false;
        } else if (!birthdayRegex.test(formValues.birthday)) {
            validateErros.birthday = "Тип введення yyyy-MM-dd";
            result = false;
        }

        if (formValues.country.length == 0) {
            validateErros.country = "Обов'язкове поле";
            result = false;
        } else if (formValues.country.length > 100) {
            validateErros.country = "Максимальна довжина 100 символів";
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

        const localData = localStorage.getItem("authors");
        if (localData) {
            const authors = JSON.parse(localData);
            const index = authors.findIndex(a => a.id == id);
            authors[index] = formValues;
            localStorage.setItem("authors", JSON.stringify(authors));
        }
        navigate("/authors")
    };

    const getError = (prop) => {
        return errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {errors[prop]}
            </Typography>
        ) : null;
    };

    useEffect(() => {
        const localData = localStorage.getItem("authors");
        if (localData) {
            const authors = JSON.parse(localData);
            const author = authors.find((a) => a.id == id);
            if (!author) {
                navigate("/authors", { replace: true })
            }
            setFormValues(author);
        } else {
            navigate("/authors", { replace: true })
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
                        Редагування автора
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
                            <FormLabel htmlFor="firstName">Ім'я</FormLabel>
                            <TextField
                                name="firstName"
                                placeholder="Ім'я автора"
                                autoComplete="firstName"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formValues.firstName}
                                onChange={onChangeHandle}
                            />
                            {getError("firstName")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="lastName">Прізвище</FormLabel>
                            <TextField
                                name="lastName"
                                placeholder="Прізвище автора"
                                autoComplete="lastName"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formValues.lastName}
                                onChange={onChangeHandle}
                            />
                            {getError("lastName")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="birthday">Дата народження</FormLabel>
                            <TextField
                                name="birthday"
                                placeholder="Дата народження автора"
                                autoComplete="birthday"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formValues.birthday}
                                onChange={onChangeHandle}
                            />
                            {getError("birthday")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="country">Країна</FormLabel>
                            <TextField
                                name="country"
                                placeholder="Ім'я автора"
                                autoComplete="country"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formValues.country}
                                onChange={onChangeHandle}
                            />
                            {getError("country")}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="imageUrl">Фото</FormLabel>
                            <TextField
                                name="imageUrl"
                                placeholder="Посилання на фото"
                                autoComplete="imageUrl"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formValues.imageUrl}
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
export default AuthorUpdateForm;