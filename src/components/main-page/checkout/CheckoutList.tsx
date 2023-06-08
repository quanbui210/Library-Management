import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useEffect, useState } from 'react'
import { borrowActions } from '../../../store/borrow/borrowSlice'
import './CheckoutList.scss'
import { CheckoutData } from '../../../types'
import { Button } from '@mui/material'
export default function CheckoutList() {
  const checkouts = useSelector((state: RootState) => state.borrow.items)
  const { isAdmin, loggedInUser } = useSelector((state: RootState) => state.auth)
  const [listCheckout, setListCheckout] = useState(
    checkouts.filter((checkout) => checkout.returned === false)
  )
  console.log(loggedInUser)

  const dispatch = useDispatch()

  const returnHandler = async (checkout: CheckoutData) => {
    const returnData = {
      checkoutId: checkout.id
    }
    const confirmed = window.confirm(`Do you want to return ${checkout.bookName}`)
    if (confirmed) {
      await dispatch(borrowActions.returnBook(returnData))
      dispatch(borrowActions.getCheckoutsThunk())
    }
  }

  const filterCheckoutAll = () => {
    setListCheckout(checkouts)
  }
  const filterReturned = () => {
    setListCheckout(checkouts.filter((checkout) => checkout.returned === true))
  }
  const filterBorrowed = () => {
    setListCheckout(checkouts.filter((checkout) => checkout.returned === false))
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
      {isAdmin && (
        <div className="filter-btn">
          <button onClick={filterCheckoutAll}>Show All</button>
          <button onClick={filterReturned}>Returned</button>
          <button onClick={filterBorrowed}>On Loan</button>
        </div>
      )}
      {isAdmin ? (
        <ul className="checkout-list">
          {listCheckout.map((checkout) => (
            <li key={checkout.id} className="checkout-item">
              <div className="checkout-details">
                <p className="book-id">Book ID: {checkout.bookId}</p>
                <p className="book-name">{checkout.bookName}</p>
                <p className="status">Status: {checkout.returned ? 'Returned' : 'On Loan'}</p>
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
