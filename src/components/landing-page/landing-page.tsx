import LoginForm from './login-form'
import libraryImg from '../../assets/library.jpeg'
import './landing-page.scss'
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
