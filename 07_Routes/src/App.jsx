import './App.css'
import Navbar from './components/navbar/Navbar'
import AuthorListPage from './pages/authorPage/AuthorListPage'
import BookCreateForm from './pages/booksPage/BookCreateForm'
import AuthorCreateForm from './pages/authorPage/AuthorCreateForm'
import BookListPage from './pages/booksPage/BookListPage'
import { Route, Routes } from 'react-router'
import ErrorPage from './pages/errorPage/ErrorPage'
import MainPage from './pages/mainPage/MainPage'
import LoginPage from './pages/loginPage/LoginPage'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/authors' element={<AuthorListPage />} />
        <Route path='/authorsCreate' element={<AuthorCreateForm />} />
        <Route path='/books' element={<BookListPage />} />
        <Route path='/booksCreate' element={<BookCreateForm />} />
        <Route path='*' element={<ErrorPage />} />

        <Route path='/login' element={<LoginPage/>}/>
      </Routes>

    </>
  )
}

export default App
