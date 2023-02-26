import React, {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";
import {
    emailSchema,
    passwordSchema,
  } from "../schema/userSchema";



function Login() {
    const email = useRef()
    const password = useRef()
    const emailRegisterd = localStorage.getItem("signUp");
    const passwordRegisterd = localStorage.getItem("password");
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validCredtials, setValidCredentials] = useState(true);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const isLogin = localStorage.getItem("login");
        // console.log("IsLogin",localStorage.getItem("login") , isLogin);
        if(isLogin){
            navigate("/");
        }
    })
    const handleClick = async () => {
        const isValidEmail = await emailSchema.isValid({ email: email.current.value });
        setValidEmail(isValidEmail);
        const isValidPassword = await passwordSchema.isValid({
            password: password.current.value,
        });
        setValidPassword(isValidPassword);
        if(isValidEmail && isValidPassword){
            const emailMatch = (emailRegisterd === email.current.value );
           
            const passwordMatch = (passwordRegisterd === password.current.value);
            if(emailMatch && passwordMatch){
               localStorage.setItem("login",true);
               navigate("/");
               
            }else{
                setValidCredentials(false);
            }
        }
    }
  return (
    <div>
            <Container className="LoginRegisterBox">
                <Form className="LoginRegisterForm">
                <h1 className="text-center">Login<i class="fa-solid fa-right-to-bracket"></i></h1>
                {(validCredtials) ? '':
                    <Form.Text className="text-muted text-center">
                       Invalid validCredtials (If not register do signUp)
                    </Form.Text> }
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email"  ref={email} required/>
        {(validEmail) ? '':
                    <Form.Text className="text-muted text-center">
                        Invalid email
                    </Form.Text> }
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" ref={password} required />
        {(validPassword) ? '':
                    <Form.Text className="text-muted text-center">
                      password must be of min 4 character
                    </Form.Text> }
      </Form.Group>
      <Button variant="primary" style={{width : '100%'}} onClick={handleClick}>
        Submit
      </Button>
      <br/>
                  <Form.Text className="text-muted text-center">
                      Havent registed? <Link to="/register">{" "}Register</Link>
                    </Form.Text>
    </Form>
    </Container>
         

    </div>
  );
}

export default Login;