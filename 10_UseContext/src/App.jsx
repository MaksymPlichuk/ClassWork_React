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
import { useEffect, useState } from "react";

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState("admin")

  useEffect(() => {
    const localData = localStorage.getItem('auth')
    if (localData) {
      setIsAuth(true);
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout isAuth={isAuth} />}>
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
          </Route>

          <Route path='*' element={<ErrorPage />} />
          <Route path='/login' element={<LoginPage setAuthCallback={setIsAuth} setRoleCallBack={setRole} />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
