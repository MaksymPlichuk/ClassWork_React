import './App.css'
import Navbar from './components/navbar/Navbar'
import BookListPage from './pages/booksPage/bookListPage'
import AuthorListPage from './pages/authorPage/AuthorListPage'
import BookCreateForm from './pages/booksPage/BookCreateForm'

function App() {


  return (
    <>
      <Navbar/>
      <BookListPage/>
      <AuthorListPage />
      <BookCreateForm />
    </>
  )
}

export default App
