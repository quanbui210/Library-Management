/* eslint-disable react/no-unescaped-entities */
import LoginForm from './LoginForm'
import libraryImg from '../../assets/libraryyy.jpg'
import './LoginPage.scss'

export default function LoginPage() {
  return (
    <>
      <h1 className="login-page-title">Login to continue</h1>
      <p>*Regular Login: Username: 'admin'(more features) or 'user'. Pw: password</p>
      <p>*With Google: Demo project, so all users login with google are admin</p>
      <div className="page-container">
        <LoginForm />
        <img src={libraryImg} alt="" />
      </div>
    </>
  )
}
