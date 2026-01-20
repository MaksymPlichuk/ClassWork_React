import './App.css'
import Navbar from './components/navbar/Navbar'
import AuthorListPage from './pages/authorPage/AuthorListPage'
import BookCreateForm from './pages/booksPage/BookCreateForm'
import AuthorCreateForm from './pages/authorPage/AuthorCreateForm'
import BookListPage from './pages/booksPage/BookListPage'

function App() {


  return (
    <>
      <Navbar />
      {/* <BookListPage /> */}
      <AuthorListPage />
      {/* <AuthorCreateForm/> */}
    </>
  )
}

export default App
