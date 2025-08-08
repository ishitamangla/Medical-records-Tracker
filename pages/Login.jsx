import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    if(!email.trim() || !password.trim()){
      alert("enter password or email");
      return;
    }
    console.log(email,password)
            navigate('./home');
    
  //   try{
  //     const res = await fetch('http://localhost:3000/login',{
  //       method:"POST",
  //       headers:{
  //         "Content-type":"application/json"
  //       },
  //       body:JSON.stringify({email,password})
  //     });
  //      const data = await res.json();

  //      if(res.ok){
  //       alert("Login successful");
  //       setEmail("");
  //       setPassword("");

          
  //      }
  //      else{
  //       alert("login failed")
  //      }
  //   }
  //   catch(error){
  //     alert("something went wrong");
  //   }
  }

  return (
   <div style={{backgroundColor:'#b5dee9ff'}}className="container d-flex justify-content-center align-items-center vh-100 ">
    <div className = " card shadow p-4" style={{width:'400px',backgroundColor:'#87b5c4ff'}}>
      <h3 className='text-center mb-4'>Login</h3>
      <form>
        <div>
          <label>Email</label>
          <input className="form-control"type="email" placeholder='Enter email' value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}  />
        </div>
        <div>
          <label>Password</label>
          <input className="form-control" type="password" placeholder="Enter password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}  />
        </div>
        <div className='d-flex justify-content-end'>
          <Button 
          className=' mt-3' 
          type="submit" 
          variant="primary" 
          style={{backgroundColor:'#004e64', borderRadius:'8px', border:'none',padding:'8px 20px'}}
          onClick={onSubmitHandler}
          onMouseOver={(e)=>(e.target.style.backgroundColor ='#457277ff')}
          onMouseOut={(e) =>(e.target.style.backgroundColor='#004e64')}
          >Login</Button>

        </div>
      </form>
      <p className="text-center">Don't have an account ?
                <Link to='/Signup'>Sign up</Link>
                </p>
    </div>
    
   </div>
  )
}

export default Login
