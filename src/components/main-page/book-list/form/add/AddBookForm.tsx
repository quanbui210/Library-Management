import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState, useEffect, FormEvent } from 'react'
import nextId from 'react-id-generator'

import { booksActions } from '../../../../../store/books/booksSlice'
import { Book } from '../../../../../types'
import './AddBookForm.scss'
import GoBackBtn from '../../../../btn/GoBackBtn'

export default function AddBookForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //   const [newAuthor, setNewAuthor] = useState<Partial<AuthorData> | undefined>()
  const inputRefs = [
    'title',
    'category',
    'description',
    'publisher',
    'publishedDate',
    'ISBN',
    'author'
  ].map((refName) => useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(null))

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
      authors: [{ name: author ?? '' }],
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
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Author</Form.Label>
            <Form.Control ref={inputRefs[6]} type="text" placeholder="Author" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Published Date</Form.Label>
            <Form.Control ref={inputRefs[4]} type="date" placeholder="Published Date" />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Book Description</Form.Label>
            <Form.Control ref={inputRefs[2]} as="textarea" rows={3} />
          </Form.Group>
        </div>
        <button>Submit</button>
      </Form>
    </div>
  )
}
