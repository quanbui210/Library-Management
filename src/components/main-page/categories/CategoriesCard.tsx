import Card from 'react-bootstrap/Card'
import { Book } from '../../../types'
import { Link } from 'react-router-dom'
import './CategoriesCard.scss'

interface Props {
  category: string
  books: Book[]
}

const colors = ['#ccc', '#36a2eb', '#ff9f40', '#4bc0c0', '#ffcd56', '#9966ff']

export default function BasicCard(props: Props) {
  const { category, books } = props
  const colorIndex = Math.floor(Math.random() * colors.length)
  const cardStyle = { backgroundColor: colors[colorIndex] }

  return (
    <div>
      <Card className="categories-card" style={cardStyle}>
        <Card.Body>
          <h2>{category}</h2>
          <h5>Book(s) in this category</h5>
        </Card.Body>
        <Card.Body>
          <ul>
            {books.map((book) => (
              <li key={book.isbn} className="books-by-category">
                <Link to={`/home/books/${book.isbn}`}>{book.title}</Link>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  )
}
