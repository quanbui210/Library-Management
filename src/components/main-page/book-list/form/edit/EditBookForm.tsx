import { Form } from 'react-bootstrap'
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
    authorName: ''
  })
  const [authorId, setAuthorId] = useState<string | null>('')
  const [categoryId, setCategoryId] = useState<string | null>('')
  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`http://localhost:8080/api/v1/books/${isbn}`)
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
        publisher: book.publishers || '',
        publishedDate: book.publishedDate || '',
        isbn: book.isbn || '',
        author: book.authorName || ''
      }
    : {
        title: '',
        category: '',
        description: '',
        publisher: '',
        publishedDate: '',
        isbn: '',
        author: ''
      }
  const [formData, setFormData] = useState(initialFormData)
  const handleChange = useCallback((e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }, [])
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const book = {
      isbn: Number(formData.isbn),
      title: formData.title,
      publishedDate: formData.publishedDate,
      description: formData.description,
      status: 'AVAILABLE',
      publishers: formData.publisher,
      authorId: authorId || '',
      categoryId: categoryId || ''
    }
    if (book) {
      dispatch(booksActions.editBookThunk({ isbn: Number(formData.isbn), book })).then(() => {
        dispatch(booksActions.fetchBooksThunk())
        navigate('/home/books')
      })
    }
  }
  useEffect(() => {
    setFormData(initialFormData)
  }, [book])

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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categories}
              getOptionLabel={(option) => option.name} // specify the label for the options
              sx={{ width: 300 }}
              onChange={handleCategoryChange}
              renderInput={(params) => <TextField {...params} label="Category" />}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div>{option.name}</div>
                </Box>
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Publisher</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.publisher || ''}
              type="text"
              placeholder="Publisher"
              name="publisher"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">ISBN</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.isbn}
              type="text"
              placeholder="ISBN"
              name="ISBN"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={authors}
              getOptionLabel={(option) => option.name} // specify the label for the options
              sx={{ width: 300 }}
              onChange={handleAuthorChange}
              renderInput={(params) => <TextField {...params} label="Authors" />}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div>{option.name}</div>
                </Box>
              )}
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
