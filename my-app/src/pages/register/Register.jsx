import { Footer } from '../../components/Footer/Footer'
import { Navbar } from '../../components/Navbar/Navbar'
import Img1 from '../../images/image 1.jpg'
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Context } from '../../context/Context';

import './Register.css'

export function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
       
      
        try {
          const res = await axios.post("http://localhost:4000/register", {
            username,
            password,

          });
          console.log(res)
           res.data && window.location.replace("http://localhost:3000/login");
        } catch (err) {
            console.log(err)

          
        }
      };
    return (
        <>
            <Navbar />
            <section className='loginPage'>

                <div className='loginBox'>
                    <div className='loginImage'>
                        <img src={Img1} />

                    </div>
                    <div className='loginBoxInner'>
                        <div className='LoginInputBox'>
                            <div className='LoginBoxHead'>

                                <p>Welcome back</p>
                                <h1>Register to your account</h1>

                            </div>
                            <div className='LoginBoxEmail'>
                                <label htmlFor="email"  >Username</label>
                                <input id="email" onChange={(e) => setUsername(e.target.value)} />

                            </div>
                            <div className='LoginBoxPassword'>
                                <label htmlFor="password"  >Password</label>
                                <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} />

                            </div>


                            <div className='LoginBoxRadio'>
                                <div>

                                    <input className='loginRadioinput' id='loginRadio' type="radio" />
                                    <label htmlFor="loginRadio">Remember me</label>

                                </div>

                                <p>forget Password?</p>


                            </div>

                            <div className='LoginBoxButton'>
                                <button onClick={handleSubmit}>Register</button>

                            </div>



                        </div>

                    </div>

                </div>

            </section>
            <Footer />
        </>


    )
}