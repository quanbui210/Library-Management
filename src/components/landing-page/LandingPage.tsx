import LoginForm from './LoginForm'
import libraryImg from '../../assets/library.jpeg'
import './LandingPage.scss'

export default function LandingPage() {
  return (
    <>
      <h1>Login to continue</h1>
      <div className="page-container">
        <LoginForm />
        <img src={libraryImg} alt="" />
      </div>
    </>
  )
}
