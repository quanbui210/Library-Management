import Card from 'react-bootstrap/Card'
import { Book } from '../../../types'

import { Link } from 'react-router-dom'

import './CategoriesCard.scss'

interface Props {
  category: string
  books: Book[]
}

export default function BasicCard(props: Props) {
  const { category, books } = props
  return (
    <div>
      <Card style={{ width: '18rem' }} className="categories-card">
        <Card.Body>
          <h2>{category}</h2>
          <h5 style={{ color: '#fff' }}>Book(s) in this category</h5>
        </Card.Body>
        <Card.Body>
          <ul>
            {books
              .filter((book) => book.category && book.category.includes(category))
              .map((book) => (
                <li key={book.ISBN} className="books-by-category">
                  <Link to={`/home/books/${book.ISBN}`}>{book.title}</Link>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  )
}
