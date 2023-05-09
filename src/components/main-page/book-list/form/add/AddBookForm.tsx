import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, FormEvent, useState, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Box } from '@mui/material'
// import nextId from 'react-id-generator'

import { booksActions } from '../../../../../store/books/booksSlice'
import { Book, Author, AuthorData } from '../../../../../types'
import './AddBookForm.scss'
import GoBackBtn from '../../../../btn/GoBackBtn'
import { RootState } from '../../../../../store/store'

export default function AddBookForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authors = useSelector((state: RootState) => state.author.items)
  const [authorId, setAuthorId] = useState<string | null>('')
  console.log(authors)
  const inputRefs = [
    'title',
    'category',
    'description',
    'publisher',
    'publishedDate',
    'ISBN',
    'author'
  ].map(() => useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const title = inputRefs[0].current?.value
    const category = inputRefs[1].current?.value
    const description = inputRefs[2].current?.value
    const publisher = inputRefs[3].current?.value
    const publishedDate = inputRefs[4].current?.value
    const ISBN = inputRefs[5].current?.value
    const author = inputRefs[6].current?.value
    const newBook: Book = {
      title: title ?? '',
      category: category ?? '',
      description: description ?? '',
      publisher: publisher ?? '',
      publishedDate: publishedDate ?? '',
      ISBN: ISBN ?? '',
      authors: [{ name: author ?? '', id: '' }],
      //author_id: ...
      borrowedId: null,
      borrowDate: null,
      status: 'available',
      returnDate: null,
      isFav: false
    }
    if (newBook) {
      console.log(newBook)
      dispatch(booksActions.addNewBook({ newBook: newBook }))
      navigate('/home/books')
    }
  }
  const handleAuthorChange = (event: React.ChangeEvent<any>, value: Author | null) => {
    if (value) {
      const selectedAuthor = authors.find((author) => author.name === value.name)
      if (selectedAuthor) {
        const authorData: AuthorData = {
          // create AuthorData object
          id: selectedAuthor.id.toString(),
          name: selectedAuthor.name,
          books: [],
          dateOfBirth: '',
          shortSummary: '',
          image: ''
        }
        setAuthorId(authorData.id)
      }
    } else {
      setAuthorId(null)
    }
  }
  console.log(authorId)
  return (
    <div>
      <GoBackBtn />
      <h1 style={{ textAlign: 'center', marginTop: '110px' }}>Add Book</h1>
      <Form onSubmit={handleSubmit} className="add-book-form">
        <div>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control ref={inputRefs[0]} type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Category</Form.Label>
            <Form.Control ref={inputRefs[1]} type="text" placeholder="Category" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Publisher</Form.Label>
            <Form.Control ref={inputRefs[3]} type="text" placeholder="Publisher" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">ISBN</Form.Label>
            <Form.Control ref={inputRefs[5]} type="text" placeholder="ISBN" />
          </Form.Group>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={authors}
            getOptionLabel={(option) => option.name} // specify the label for the options
            sx={{ width: 300 }}
            onChange={handleAuthorChange}
            renderInput={(params) => <TextField {...params} label="Author" />}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <div>{option.name}</div>
              </Box>
            )}
          />
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Published Date</Form.Label>
            <Form.Control ref={inputRefs[4]} type="date" placeholder="Published Date" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Book Description</Form.Label>
            <Form.Control ref={inputRefs[2]} className="textarea" />
          </Form.Group>
        </div>
        <button>Submit</button>
      </Form>
    </div>
  )
}
