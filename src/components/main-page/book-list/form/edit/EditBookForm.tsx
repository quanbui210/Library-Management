import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FormEvent, useState, useCallback } from 'react'

import GoBackBtn from '../../../../btn/GoBackBtn'
import { RootState } from '../../../../../store/store'
import { Book } from '../../../../../types'
import { booksActions } from '../../../../../store/books/booksSlice'

export default function EditBookForm() {
  const { ISBN } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.book.items)
  const book = books.find((book) => book.ISBN === ISBN)
  const initialFormData = book
    ? {
        title: book?.title,
        category: book?.category,
        description: book?.description,
        publisher: book?.publisher,
        publishedDate: book?.publishedDate,
        ISBN: book?.ISBN,
        author: book?.authors.map((a) => a.name)
      }
    : {
        title: '',
        category: '',
        description: '',
        publisher: '',
        publishedDate: '',
        ISBN: '',
        author: ''
      }
  const [formData, setFormData] = useState(initialFormData)
  const handleChange = useCallback((e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    console.log('triggerredd')
  }, [])
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const selectedBook: Book = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      publisher: formData.publisher,
      publishedDate: formData.publishedDate,
      ISBN: formData.ISBN,
      authors: [{ name: formData.author }],
      status: '',
      borrowedId: null,
      borrowDate: null,
      returnDate: null,
      isFav: false
    }
    dispatch(booksActions.editBook({ ISBN: book?.ISBN, selectedBook: selectedBook }))
    dispatch(booksActions.fetchBooksThunk())
    navigate('/home/books')
  }
  return (
    <div>
      <GoBackBtn />
      <h1 style={{ textAlign: 'center', marginTop: '110px' }}>Edit {book?.title}</h1>
      <Form className="add-book-form" onSubmit={handleSubmit}>
        <div>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.title}
              type="text"
              placeholder="Title"
              name="title"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Category</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.category}
              type="text"
              placeholder="Category"
              name="category"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Publisher</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.publisher}
              type="text"
              placeholder="Publisher"
              name="publisher"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">ISBN</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.ISBN}
              type="text"
              placeholder="ISBN"
              name="ISBN"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Author</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.author}
              type="text"
              placeholder="Author"
              name="author"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Published Date</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.publishedDate}
              type="date"
              placeholder="Published Date"
              name="publishedDate"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Book Descrsiption</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.description}
              as="textarea"
              rows={3}
              name="description"
            />
          </Form.Group>
        </div>
        <button>Submit</button>
      </Form>
    </div>
  )
}
