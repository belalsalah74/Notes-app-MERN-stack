import { useState } from 'react'
import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

function LoginRegisterPage() {
    const [loginClass,setLoginClass] = useState("nav-link active")
    const [registerClass, setRegisterClass] = useState("nav-link")
    const [formType, setFormType] = useState("login") 
    // const [showError, setShowError] = useState(false);
    
    function switchLogin(e) {
        setLoginClass("nav-link active")
        setRegisterClass("nav-link")
        setFormType("login")
    }

    function switchRegister() {
          setLoginClass("nav-link")
        setRegisterClass("nav-link  active") 
         setFormType("register")
    }
  return (
    <div className="row  align-items-center">
                  <div className="col-md-6 mx-auto">
                      <div className="card bg-secondary">
                          <div className="card-header">
                              <ul className="nav nav-pills nav-fill">
                                    <li className="nav-item">
                                        <button className={loginClass} aria-current="page" onClick={switchLogin}>Login</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={registerClass} onClick={switchRegister}>Register</button>
                                    </li></ul>
                          </div>
                          <div className="card-body">
                            {formType === 'login' &&  <LoginForm />}
                            {formType === 'register' &&  <RegisterForm/>}
                            
                          </div>
                      </div>
                  </div>
              </div>
      
  )
}

export default LoginRegisterPage