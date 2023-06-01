import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FormEvent, useState, useCallback, useEffect } from 'react'

import GoBackBtn from '../../../../btn/GoBackBtn'
import { RootState } from '../../../../../store/store'
import { AuthorData, CategoryData } from '../../../../../types'
import { booksActions } from '../../../../../store/books/booksSlice'
import { Autocomplete, TextField, Box } from '@mui/material'

export default function EditBookForm() {
  const { isbn } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const [book, setBook] = useState({
    title: '',
    categoryName: '',
    description: '',
    publishers: '',
    publishedDate: '',
    isbn: 0,
    authorName: '',
    imageUrl: ''
  })
  const [authorId, setAuthorId] = useState<string | null>('')
  const [categoryId, setCategoryId] = useState<string | null>('')
  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://lib-backend-e0qi.onrender.com/api/v1/books/${isbn}`)
      const book = await res.json()
      setBook(book)
    }
    fetchBook()
  }, [isbn])
  const initialFormData = book
    ? {
        title: book.title || '',
        category: book.categoryName || '',
        description: book.description || '',
        publishers: book.publishers || '',
        publishedDate: book.publishedDate || '',
        isbn: book.isbn || '',
        author: book.authorName || '',
        imageUrl: book.imageUrl || ''
      }
    : {
        title: '',
        category: '',
        description: '',
        publishers: '',
        publishedDate: '',
        isbn: '',
        author: '',
        imageUrl: ''
      }
  const [formData, setFormData] = useState(initialFormData)
  const handleChange = useCallback((e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }, [])
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const book = {
      isbn: Number(formData.isbn),
      title: formData.title,
      publishedDate: formData.publishedDate,
      description: formData.description,
      status: 'AVAILABLE',
      publishers: formData.publishers,
      authorId: authorId || '',
      categoryId: categoryId || '',
      imageUrl: formData.imageUrl
    }
    await dispatch(booksActions.editBookThunk({ isbn: Number(formData.isbn), book }))
    await dispatch(booksActions.fetchBooksThunk())
    navigate('/home/books')
  }
  useEffect(() => {
    setFormData(initialFormData)
  }, [book])

  useEffect(() => {
    // Check if the initial data is available
    if (book) {
      const initialAuthor = authors.find((author) => author.name === book.authorName)
      const initialCategory = categories.find((category) => category.name === book.categoryName)

      // Set the initial author value if available
      if (initialAuthor) {
        setAuthorId(initialAuthor.id.toString())
      }

      // Set the initial category value if available
      if (initialCategory) {
        setCategoryId(initialCategory.id.toString())
      }
    }
  }, [authors, categories, book])

  const handleAuthorChange = (event: React.ChangeEvent<any>, value: AuthorData | null) => {
    if (value) {
      const authorId = value.id.toString()
      setAuthorId(authorId)
      console.log(authorId)
    } else {
      setAuthorId(null)
    }
  }
  const handleCategoryChange = (event: React.ChangeEvent<any>, value: CategoryData | null) => {
    if (value) {
      const categoryId = value.id.toString()
      setCategoryId(categoryId)
      console.log(categoryId)
    } else {
      setCategoryId(null)
    }
  }
  return (
    <div className="container">
      <GoBackBtn />
      <h1>Edit</h1>
      <Form onSubmit={handleSubmit} className="add-book-form">
        <Row>
          <Col>
            <Form.Group className="form-group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="form-group">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Publisher"
                value={formData.publishers || ''}
                onChange={handleChange}
                name="publishers"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="form-group">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={handleChange}
                name="isbn"
              />
            </Form.Group>
          </Col>
          <Col>
            <Autocomplete
              className="form-autocomplete"
              disablePortal
              id="author-autocomplete"
              options={authors}
              getOptionLabel={(option) => option.name}
              value={authorId ? authors.find((author) => author.id.toString() === authorId) : null}
              onChange={handleAuthorChange}
              renderInput={(params) => <TextField {...params} label="Author" />}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div>{option.name}</div>
                </Box>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="form-group">
              <Form.Label>P.Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                value={formData.publishedDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Autocomplete
              className="form-autocomplete"
              disablePortal
              id="category-autocomplete"
              options={categories}
              getOptionLabel={(option) => option.name}
              value={
                categoryId
                  ? categories.find((category) => category.id.toString() === categoryId)
                  : null
              }
              onChange={handleCategoryChange}
              renderInput={(params) => <TextField {...params} label="Category" />}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div>{option.name}</div>
                </Box>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="form-group">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                name="description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  )
}
