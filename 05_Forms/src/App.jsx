import './App.css'
import Navbar from './components/navbar/Navbar'
import BookListPage from './pages/booksPage/bookListPage'
import AuthorListPage from './pages/authorPage/AuthorListPage'
import BookCreateForm from './pages/booksPage/BookCreateForm'
import AuthorCreateForm from './pages/authorPage/AuthorCreateForm'

function App() {


  return (
    <>
      <Navbar/>
      {/* <BookListPage/> */}
      <AuthorListPage />
      {/* <BookCreateForm /> */}
      <AuthorCreateForm/>
    </>
  )
}

export default App
