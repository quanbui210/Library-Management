/* eslint-disable react/no-unescaped-entities */
import LoginForm from './LoginForm'
import libraryImg from '../../assets/libraryyy.jpg'
import './LoginPage.scss'

export default function LoginPage() {
  return (
    <>
      <h1 className="login-page-title">Login to continue</h1>
      <div className="page-container">
        <LoginForm />
        <img src={libraryImg} alt="" />
      </div>
    </>
  )
}
