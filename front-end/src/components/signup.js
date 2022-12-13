import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })
 
    const getData = (e) => {
        e.preventDefault()
        let data = {
            name, email, password
        }
        fetch('http://localhost:5000/signup', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
localStorage.setItem("user", JSON.stringify(data.result)); // to store data in local storage
localStorage.setItem("token", JSON.stringify(data.auth)); // to store data in local storage
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }
    // const collectData = () => {
    //     console.warn(name, email, password)
    // }

    return (
        <form onSubmit={getData} className='register'>
            <h1>Signup Compinent</h1>
            <input className='signupfields' type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <input className='signupfields' type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input className='signupfields' type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button className='signupbutton' type='submit' >SignUp</button>
        </form>
    );
}


export default Signup;     