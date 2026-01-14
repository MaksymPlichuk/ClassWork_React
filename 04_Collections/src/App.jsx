import './App.css'
import Navbar from './components/navbar/Navbar'
import BookListPage from './pages/booksPage/bookListPage'
import AuthorListPage from './pages/authorPage/AuthorListPage'

function App() {


  return (
    <>
      <Navbar/>
      <BookListPage/>
      <AuthorListPage />
    </>
  )
}

export default App
