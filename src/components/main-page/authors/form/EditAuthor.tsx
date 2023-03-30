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

export default function EditAuthor() {
  const { authorId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)
  const author = authors.find((a) => {
    return a.id === parseInt(authorId as string)
  })
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const inputValue = inputRef.current?.value
    dispatch(authorsActions.editAuthor({ id: parseInt(authorId as string), value: inputValue }))
    // const updatedAuthor = {
    //   ...author,
    //   shortSummary: inputValue
    // }
    // localStorage.setItem(`author-${authorId}`, JSON.stringify(updatedAuthor))
    // dispatch(authorsActions.updateAuthor(updatedAuthor))
    navigate('/home/authors')
  }

  return (
    <div className="authors-form-container">
      <GoBackBtn />
      <h2>{author && author.name}</h2>
      <p>{author && author.dateOfBirth}</p>
      <p>{author?.shortSummary}</p>
      <img src={author?.image} alt="" />
      <Form className="authors-action-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          {/* <Form.Label className="form-label">Edit Author's Info:</Form.Label> <br />] */}
          <Form.Control ref={inputRef} as="textarea" placeholder="Enter short summary" />
        </Form.Group>
        <Form.Group>
          <Button className="add-form-btn" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
