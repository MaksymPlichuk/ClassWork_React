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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
        name: "",
        birth_date: "",
        image: "",
    })

    function onChangeHandle(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const baseURL = import.meta.env.VITE_AUTHORS_URL;
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();
    const { authors } = useSelector(state => state.author)


    const validate = () => {
        const validateErros = {};
        let result = true;

        if (formValues.name.length == 0) {
            validateErros.name = "Обов'язкове поле";
            result = false;
        } else if (formValues.name.length > 100) {
            validateErros.name = "Максимальна довжина 100 символів";
            result = false;
        }

        const birthdayRegex = /\d{4}-\d{2}-\d{2}/;
        if (formValues.birth_date.length == 0) {
            validateErros.birth_date = "Обов'язкове поле";
            result = false;
        } else if (!birthdayRegex.test(formValues.birth_date)) {
            validateErros.birth_date = "Тип введення yyyy-MM-dd";
            result = false;
        }

        return { result: result, errors: validateErros }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const validateRes = validate();

        if (!validateRes.result) {
            setErrors(validateRes.errors);
            return;
        } else {
            setErrors({});
        }

        try {
            const resp = await axios.put(baseURL, formValues);
            const { status } = resp
            console.log(resp);

            const newAuthors = authors.filter((a) => a.id != id);
            newAuthors[id] = formValues;

            dispatch({ type: "updateAuthor", payload: newAuthors })

            if (status == 200) {
                navigate("/authors")
            }

        } catch (error) {
            console.log(error);

        }

    };

    const getError = (prop) => {
        return errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {errors[prop]}
            </Typography>
        ) : null;
    };


    useEffect(() => {
        async function fetchAuthors() {
            const resp = await axios.get(`${baseURL}/${id}`)
            const { data, status } = resp;

            if (status == 200) {
                console.warn(data);
                setFormValues(data.data)
            } else {
                navigate("/authors", { replace: true })
            }
        }
        fetchAuthors();
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
                            <FormLabel htmlFor="name">Ім'я</FormLabel>
                            <TextField
                                name="name"
                                placeholder="Ім'я автора"
                                autoComplete="name"
                                fullWidth
                                type="text"
                                variant="outlined"
                                value={formValues.name}
                                onChange={onChangeHandle}
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
                                value={formValues.birth_date}
                                onChange={onChangeHandle}
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
                                value={formValues.image}
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