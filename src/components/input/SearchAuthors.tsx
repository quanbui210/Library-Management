/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch } from 'react-redux'
import { authorsActions } from '../../store/authors/authorsSlice'
import { Dispatch, SetStateAction } from 'react'

import './SearchAuthors.scss'

type Props = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  filterAuthors: () => void
}

export default function SearchAuthors(props: Props) {
  const { setSearchTerm, filterAuthors } = props
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  return (
    <div className="search-input">
      <input type="text" placeholder="Search for authors" onChange={handleInputChange} />
    </div>
  )
}
