import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { booksActions } from '../../../store/books/booksSlice'
import { RootState } from '../../../store/store'
import BasicCard from './CategoriesCard'
import GoBackBtn from '../../btn/GoBackBtn'
import SearchInput from '../../input/SearchInput'
import { categoryActions } from '../../../store/category/categorySlice'
import { CategoryData } from '../../../types'

export default function Categories() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  // const [categoriesList, setCategoriesList] = useState<CategoryData[]>([])
  const categories = useSelector((state: RootState) => state.category.items)
  console.log(categories)
  useEffect(() => {
    dispatch(categoryActions.fetchCategoriesThunk())
  }, [dispatch])

  // const filterCategories = () => {
  //   if (searchTerm.trim() === '') {
  //     setCategoriesList(categories)
  //   } else {
  //     const filteredCategories = categories.filter((category) => {
  //       return category.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     })
  //     setCategoriesList(filteredCategories)
  //   }
  // }
  // useEffect(() => {
  //   dispatch(booksActions.fetchBooksThunk())
  // }, [])
  // useEffect(() => {
  //   filterCategories()
  // }, [searchTerm])
  return (
    <div>
      <GoBackBtn />
      <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <h1 style={{ textAlign: 'center', margin: '50px 0' }}>Categories</h1>
      <ul className="categories">
        {categories.map((category) => (
          <li key={category.name} className="category-list">
            <BasicCard books={category.books} category={category.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}
