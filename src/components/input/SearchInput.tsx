import { SearchProps } from '../../types'
import './SearchInput.scss'

export default function SearchInput(props: SearchProps) {
  const { setSearchTerm } = props
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  return (
    <div className="search-input">
      <input type="text" placeholder="Search" onChange={handleInputChange} />
    </div>
  )
}
