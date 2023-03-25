import GoBackBtn from '../btn/GoBackBtn'
export default function BooksErrorElement() {
  return (
    <div>
      <GoBackBtn />
      <h1 style={{ textAlign: 'center' }}>This book is currently unavailable</h1>
    </div>
  )
}
