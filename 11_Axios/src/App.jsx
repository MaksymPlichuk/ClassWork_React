import './App.css'
import AuthorListPage from './pages/authorPage/AuthorListPage'
import BookCreateForm from './pages/booksPage/BookCreateForm'
import AuthorCreateForm from './pages/authorPage/AuthorCreateForm'
import AuthorUpdateForm from './pages/authorPage/AuthorUpdateForm'
import BookListPage from './pages/booksPage/BookListPage'
import BookUpdateForm from './pages/booksPage/BookUpdateForm'
import { Route, Routes } from 'react-router'
import ErrorPage from './pages/errorPage/ErrorPage'
import MainPage from './pages/mainPage/MainPage'
import DefaultLayout from './components/layout/DefaultLayout'
import LoginPage from "./pages/auth/loginPage/LoginPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './pages/context/AuthContext'
import { ThemeProvider } from '@emotion/react'
import { lightTheme } from './pages/theme/lightTheme'
import { darkTheme } from './pages/theme/darkTheme'
import { ThemeContext } from './pages/context/ThemeContext'
import BookDescription from './pages/booksPage/BookDescription'

function App() {

  const { login } = useContext(AuthContext)
  const [role, setRole] = useState("admin")
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const localData = localStorage.getItem('auth')
    if (localData) {
      login();
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<MainPage />} />

            <Route path='/authors'>
              <Route index element={<AuthorListPage />} />
              <Route path='create' element={<AuthorCreateForm />} />
              <Route path='update/:id' element={<AuthorUpdateForm />} />
            </Route>

            <Route path='/books'>
              <Route index element={<BookListPage role={role} />} />
              <Route path='create' element={<BookCreateForm />} />
              <Route path='update/:id' element={<BookUpdateForm />} />
              <Route path='description/:id' element={<BookDescription/>} />
            </Route>

            <Route path='*' element={<ErrorPage />} />
            <Route path='/login' element={<LoginPage setRoleCallBack={setRole} />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
