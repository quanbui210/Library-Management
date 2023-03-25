import { useSelector, useDispatch } from 'react-redux'
import { booksActions } from '../../../store/books/booksSlice'
import { RootState } from '../../../store/store'
import BasicCard from './CategoriesCard'
import GoBackBtn from '../../btn/GoBackBtn'
import { useEffect } from 'react'

export default function Categories() {
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.items)
  const categories = [
    ...new Set(books.map((book) => book.category).filter((category) => category !== undefined))
  ]
  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [])
  return (
    <div>
      <GoBackBtn />
      <h1 style={{ textAlign: 'center', margin: '50px 0' }}>Categories</h1>
      <ul className="categories">
        {categories &&
          categories.map((category) => (
            <li key={category} className="category-list">
              <BasicCard books={books} category={category} />
            </li>
          ))}
      </ul>
    </div>
  )
}
