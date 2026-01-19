import './App.css'
import Navbar from './components/navbar/Navbar'
import AuthorListPage from './pages/authorPage/AuthorListPage'
import BookCreateForm from './pages/booksPage/BookCreateForm'
import AuthorCreateForm from './pages/authorPage/AuthorCreateForm'
import BookListPage from './pages/booksPage/BookListPage'
import { Route,Routes } from 'react-router'
import ErrorPage from './pages/errorPage/ErrorPage'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<BookListPage /> } />
        <Route path='/authors' element={<AuthorListPage /> } />
        <Route path='*' element={<ErrorPage /> } />
      </Routes>
      
      {/* <AuthorListPage /> */}
      {/* <AuthorCreateForm/> */}
    </>
  )
}

export default App
