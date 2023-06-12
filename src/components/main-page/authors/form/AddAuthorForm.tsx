import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRef, FormEvent } from 'react'
import auImg from '../../../../assets/authors-image/me.png'
import nextId from 'react-id-generator'

import { authorsActions } from '../../../../store/authors/authorsSlice'
import GoBackBtn from '../../../btn/GoBackBtn'
import './AddAuthor.scss'

export default function AddAuthorForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //   const [newAuthor, setNewAuthor] = useState<Partial<AuthorData> | undefined>()
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const authorName = nameRef.current?.value
    const description = descriptionRef.current?.value
    const newAuthor = {
      name: authorName ?? '',
      imgUrl: imageUrlRef.current?.value,
      description: description ?? ''
    }

    await dispatch(authorsActions.addAuthorThunk({ author: newAuthor }))
    await dispatch(authorsActions.fetchAuthorsThunk())
    navigate('/home/authors')
  }
  return (
    <div className="container">
      <GoBackBtn />
      <h1>Add New Author</h1>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Author Name</Form.Label>
            <Form.Control
              className="form-control"
              ref={nameRef}
              type="text"
              placeholder="Author's Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Image</Form.Label>
            <Form.Control
              className="form-control"
              ref={imageUrlRef}
              type="text"
              placeholder="Image Url"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author Description</Form.Label>
            <Form.Control ref={descriptionRef} as="textarea" rows={3} />
          </Form.Group>
          <button className="add-form-btn">Submit</button>
        </Form>
      </div>
    </div>
  )
}
