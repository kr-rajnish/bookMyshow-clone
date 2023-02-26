import React, {useEffect, useRef, useState} from "react";
import Home from "./Home";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";
import {
    nameSchema,
    emailSchema,
    passwordSchema,
  } from "../schema/userSchema";
  
function Register(){
    // console.log("Signup",localStorage.getItem("login"));
    
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const isLogin = localStorage.getItem("login");    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const navigate = useNavigate();
    // console.log(localStorage.getItem("name"),localStorage.getItem('email'),
    //  localStorage.getItem("login"));
    useEffect(()=>{
        // console.log("IsLogin" ,localStorage.getItem("login"), isLogin);       
         if(isLogin == true){
            navigate("/");
        }
    })
    const handleClick= async ()=>{
        const isValidName = await nameSchema.isValid({ name: name.current.value });
        setValidName(isValidName);
        const isValidEmail = await emailSchema.isValid({ email: email.current.value });
        setValidEmail(isValidEmail);
        const isValidPassword = await passwordSchema.isValid({
            password: password.current.value,
        });
        setValidPassword(isValidPassword);
        const isSamePassword = password.current.value === confirmPassword.current.value;
        setValidConfirmPassword(password === confirmPassword);
        // console.log(isValidEmail,isValidName,isValidPassword,isSamePassword);
        if(isValidName && isValidEmail && isValidPassword && isSamePassword){
        
         localStorage.setItem("name",name.current.value);
         localStorage.setItem("email",email.current.value);         
         localStorage.setItem("password",password.current.value);
         localStorage.setItem("signUp",email.current.value);
         alert("Registerd")
         navigate("/login");
         
        }else{
        //    console.log("couldNot Save");
        }
        const localSignup = localStorage.getItem("signUp");
        // console.log(localSignup);
    }
    return (
        <div>
            <Container className="LoginRegisterBox">
                <Form className="LoginRegisterForm">
                 <h1 className="text-center">SignUp<i className="fa-solid fa-lock"></i></h1>
               
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Name</Form.Label> */}
                    <Form.Control type="name" placeholder="Name" ref={name} required/>
                    {(validName) ? "" :  <Form.Text className="text-muted">
                   atleast 3 letter
                 </Form.Text> }
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control type="email" placeholder="Enter email" ref={email} required/>
                    {(validEmail) ? '':
                    <Form.Text className="text-muted" >
                       Invalid email
                    </Form.Text> }
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Name</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" ref={password} required/>
                    {(validPassword) ? "" :
                    <Form.Text className="text-muted">
                       password must be of min 4 character
                    </Form.Text> }
                  </Form.Group>
            
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                   
                    <Form.Control type="password" placeholder="Confirm Password" ref={confirmPassword} required/>
                    {(validConfirmPassword) ?  "" :
                    <Form.Text className="text-muted">
                       password must be of min 4 character
                    </Form.Text>}
                    </Form.Group>
                  <Button variant="primary" style={{width : '100%'}}  onClick={handleClick}>
                    Register
                  </Button>
                  <br/>
                  <Form.Text className="text-muted text-center">
                      Already Have an Account?<Link to="/login">{" "}Login</Link>
                    </Form.Text>
                </Form>
                </Container>
         
            

        </div>
    );
}

export default Register;