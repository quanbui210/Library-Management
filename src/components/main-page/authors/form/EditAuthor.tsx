/* eslint-disable react/no-unescaped-entities */
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../../../store/store'
import GoBackBtn from '../../../btn/GoBackBtn'
import { authorsActions } from '../../../../store/authors/authorsSlice'
import './EditAuthor.scss'
import authorImage from '../../../../assets/authors-image/aimg.png'

export default function EditAuthor() {
  const { authorId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)
  const author = authors.find((a) => a.id === authorId)
  const nameInputRef = useRef<HTMLTextAreaElement>(null)
  const descInputRef = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const editedAuthor = {
      name: nameInputRef.current?.value ?? '',
      description: descInputRef.current?.value ?? ''
    }
    await dispatch(
      authorsActions.editAuthorThunk({
        authorId: authorId ?? '',
        author: editedAuthor
      })
    )
    await dispatch(authorsActions.fetchAuthorsThunk())
    navigate('/home/authors')
  }

  return (
    <div className="authors-form-container">
      <GoBackBtn />
      <h2>{author && author.name}</h2>
      <p>{author?.description}</p>
      <img src={author?.imageUrl ? author.imageUrl : authorImage} alt="" />
      <Form className="authors-action-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            ref={nameInputRef}
            as="textarea"
            placeholder="Enter name"
            defaultValue={author ? author.name : ''}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            ref={descInputRef}
            as="textarea"
            placeholder="Enter description"
            defaultValue={author ? String(author.description) : ''}
          />
        </Form.Group>
        <Form.Group>
          <button className="edit-form-btn" type="submit">
            Submit
          </button>
        </Form.Group>
      </Form>
    </div>
  )
}
