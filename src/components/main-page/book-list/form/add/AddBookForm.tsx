import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, FormEvent, useState, ChangeEvent, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Box } from '@mui/material'
// import nextId from 'react-id-generator'

import { booksActions } from '../../../../../store/books/booksSlice'
import { AuthorData, CategoryData } from '../../../../../types'
import './AddBookForm.scss'
import GoBackBtn from '../../../../btn/GoBackBtn'
import { RootState } from '../../../../../store/store'

export default function AddBookForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const [authorId, setAuthorId] = useState<string | null>('')
  const [categoryId, setCategoryId] = useState<string | null>('')
  const inputRefs = [
    'title',
    'category',
    'description',
    'publisher',
    'publishedDate',
    'isbn',
    'author',
    'imageURL'
  ].map(() => useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const title = inputRefs[0].current?.value
    const description = inputRefs[2].current?.value
    const publisher = inputRefs[3].current?.value
    const publishedDate = inputRefs[4].current?.value
    const isbn = inputRefs[5].current?.value
    const imgURL = inputRefs[7].current.value

    const book = {
      isbn: parseInt(isbn),
      title: title ?? '',
      publishedDate: publishedDate ?? '',
      description: description ?? '',
      status: 'AVAILABLE',
      publishers: publisher ?? '',
      authorId: authorId ?? '',
      categoryId: categoryId ?? '',
      imageURL: imgURL ?? ''
    }
    console.log(book.imageURL)
    await dispatch(booksActions.addBooksThunk({ book }))
    await dispatch(booksActions.fetchBooksThunk())
    navigate('/home/books')
  }
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
      <h1 style={{ textAlign: 'center', marginTop: '110px' }}>Add Book</h1>
      <Form onSubmit={handleSubmit} className="add-book-form">
        <Row>
          <Col>
            <Form.Group className="mb-3 form-group">
              {/* <Form.Label className="form-label">Title</Form.Label> */}
              <Form.Control ref={inputRefs[0]} type="text" placeholder="Title" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 form-group">
              {/* <Form.Label className="form-label">Publisher</Form.Label> */}
              <Form.Control ref={inputRefs[3]} type="text" placeholder="Publisher" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="autocomplete-row">
          <Col>
            <Autocomplete
              className="form-autocomplete"
              disablePortal
              id="combo-box-demo"
              options={authors}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              onChange={handleAuthorChange}
              renderInput={(params) => <TextField {...params} label="Author" />}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <div>{option.name}</div>
                </Box>
              )}
            />
          </Col>
          <Col>
            <Autocomplete
              className="form-autocomplete"
              disablePortal
              id="combo-box-demo"
              options={categories}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
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
            <Form.Group className="mb-3 form-group">
              {/* <Form.Label className="form-label">ISBN</Form.Label> */}
              <Form.Control ref={inputRefs[5]} type="text" placeholder="ISBN" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 form-group">
              <Form.Control ref={inputRefs[4]} type="date" placeholder="Published Date" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 form-group">
              {/* <Form.Label className="form-label">Image URL</Form.Label> */}
              <Form.Control ref={inputRefs[7]} type="text" placeholder="Image URL" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 form-group">
              {/* <Form.Label className="form-label">Book Description</Form.Label> */}
              <Form.Control ref={inputRefs[2]} className="textarea" placeholder="Description" />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
