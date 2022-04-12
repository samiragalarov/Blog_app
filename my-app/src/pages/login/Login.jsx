import { Footer } from '../../components/Footer/Footer'
import { Navbar } from '../../components/Navbar/Navbar'
import Img1 from '../../images/image 1.jpg'
import { useContext, useState, useEffect } from "react";
import { Context } from '../../context/Context';
import axios from "axios";
import './Login.css'

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user,dispatch, isFetching } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try{
            const res = await axios.post("http://localhost:4000/login",{
                username,
                password
            });
            console.log(res)

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            
      

        }catch(err){
            dispatch({ type: "LOGIN_FAILURE" });
             console.log(err)

        }
    }
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
                                <h1>Login to your account</h1>

                            </div>
                            <div className='LoginBoxEmail'>
                                <label htmlFor="email" >Username</label>
                                <input id="email"  onChange={(e)=>{setUsername(e.target.value)}}/>

                            </div>
                            <div className='LoginBoxPassword'>
                                <label htmlFor="password"  >Password</label>
                                <input id='password' type="password" onChange={(e)=>{setPassword(e.target.value)}}/>

                            </div>


                            <div className='LoginBoxRadio'>
                                <div>

                                    <input  className='loginRadioinput' id='loginRadio' type="radio" />
                                    <label htmlFor="loginRadio">Remember me</label>

                                </div>

                                <p>forget Password?</p>


                            </div>

                            <div className='LoginBoxButton'>

                                <button onClick={handleSubmit}>Login</button>

                            </div>



                        </div>

                    </div>

                </div>

            </section>
            <Footer />
        </>


    )
}