import { useSelector, useDispatch } from 'react-redux'
import { booksActions } from '../../../store/books/booksSlice'
import { RootState } from '../../../store/store'
import BasicCard from './CategoriesCard'
import GoBackBtn from '../../btn/GoBackBtn'
import { useEffect, useState } from 'react'
import SearchInput from '../../input/SearchInput'

export default function Categories() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriesList, setCategoriesList] = useState<string[]>([])
  const books = useSelector((state: RootState) => state.book.items)
  const categories: string[] = [
    ...new Set(books.map((book) => book.category).filter((category) => category !== undefined))
  ]

  const filterCategories = () => {
    if (searchTerm.trim() === '') {
      setCategoriesList(categories)
    } else {
      const filteredCategories = categories.filter((category: string) => {
        return category.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setCategoriesList(filteredCategories)
    }
  }
  useEffect(() => {
    dispatch(booksActions.fetchBooksThunk())
  }, [])
  useEffect(() => {
    filterCategories()
  }, [searchTerm, categories])
  return (
    <div>
      <GoBackBtn />
      <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <h1 style={{ textAlign: 'center', margin: '50px 0' }}>Categories</h1>
      <ul className="categories">
        {categoriesList &&
          categoriesList.map((category) => (
            <li key={category} className="category-list">
              <BasicCard books={books} category={category} />
            </li>
          ))}
      </ul>
    </div>
  )
}
