import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useEffect } from 'react'
import { borrowActions } from '../../../store/borrow/borrowSlice'
import './CheckoutList.scss'
import { CheckoutData } from '../../../types'
import { Button } from '@mui/material'
export default function CheckoutList() {
  const checkouts = useSelector((state: RootState) => state.borrow.items)
  const { isAdmin, loggedInUser } = useSelector((state: RootState) => state.auth)
  console.log(loggedInUser)

  const dispatch = useDispatch()

  const returnHandler = async (checkout: CheckoutData) => {
    const returnData = {
      checkoutId: checkout.id
    }
    const confirmed = window.confirm(`Do you want to return ${checkout.bookName}`)
    if (confirmed) {
      await dispatch(borrowActions.returnBook(returnData))
      dispatch(borrowActions.getCheckoutsThunk)
    }
  }

  useEffect(() => {
    dispatch(borrowActions.getCheckoutsThunk())
  }, [dispatch])

  if (checkouts.length < 1) {
    return (
      <div>
        <h1 className="checkout-list-heading">Checkout List</h1>
        <p>No Check out Available</p>
      </div>
    )
  }

  return (
    <div className="checkout-list-container">
      <h1 className="checkout-list-heading">Checkout List</h1>
      {isAdmin ? (
        <ul className="checkout-list">
          {checkouts.map((checkout) => (
            <li key={checkout.id} className="checkout-item">
              <div className="checkout-details">
                <p className="book-id">Book ID: {checkout.bookId}</p>
                <p className="book-name">{checkout.bookName}</p>
                <p className="status">Status: {checkout.returned ? 'Returned' : 'Borrowed'}</p>
                <p>
                  Borrowed by: {checkout.username} - {checkout.userId}
                </p>
                <p className="borrow-date">Borrowed Date: {checkout.borrowedDate}</p>
                <p className="return-date">Return Date: {checkout.returnedDate}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="checkout-list">
          {checkouts
            .filter((checkout) => checkout.userId === loggedInUser.id)
            .map((checkout) => (
              <li key={checkout.id} className="checkout-item">
                <div className="checkout-details">
                  <p className="book-id">Book ID: {checkout.bookId}</p>
                  <p className="book-name">{checkout.bookName}</p>
                  <p className="status">Status: {checkout.returned ? 'Returned' : 'Borrowed'}</p>
                  <p className="borrow-date">Borrowed Date: {checkout.borrowedDate}</p>
                  <p className="return-date">Return Date: {checkout.returnedDate}</p>
                  <Button
                    disabled={checkout.returned}
                    onClick={() => returnHandler(checkout)}
                    className={
                      checkout.returned ? 'return-button returned' : 'return-button borrowed'
                    }>
                    Return
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
