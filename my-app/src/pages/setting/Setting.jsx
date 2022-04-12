import { Footer } from '../../components/Footer/Footer'
import { Navbar } from '../../components/Navbar/Navbar'
import Img1 from '../../images/image 1.jpg'
import UserImage from '../../images/unsplash_jmURdhtm7Ng.jpg'
import axios from "axios";
import {IoMdAdd} from 'react-icons/io'
import './Seting.css'
import { useState } from 'react';

export function Setting() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const updateAccount = async (e) => {
        e.preventDefault();
        const newPost = {
            username: username,
            password: password,
            email: email

            // title: header,
            // posttext: text,
            // categories: cat,
            // owner: JSON.parse(localStorage.getItem("user")).username,
            // ownerid : JSON.parse(localStorage.getItem("user")).id,

        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:4000/api/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put(`http://localhost:4000/updateuser/${JSON.parse(localStorage.getItem("user")).id}`, newPost, {
                headers: {
                    'Authorization': `Basic ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            });
            console.log(res)

            localStorage.removeItem("user")
            window.location.replace("http://localhost:3000/login" + res.data._id);
        } catch (err) { console.log(err) }
    };


    return (
        <>
            <Navbar />
            <section className='SettingPage'>

                <div className='SettingBox'>
                    <div className='settingImage'>
                        <img src={Img1} />

                    </div>
                    <div className='SettingInner'>
                        <div className='SettingInnerPart1'>
                            <h2>
                                Edit Profile
                            </h2>

                            <div className='SettingCircle'>
                                {file ? (
                                    <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
                                ) : (
                                    <> 
                                     <input
                                        
                                        type="file"
                                        id="file-upload"
                                        style={{ visibility:"hidden"}}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <label htmlFor='file-upload' class="custom-file-upload">
                                      <IoMdAdd   size={42} />

                                    </label>
                                         
                                    </>
                                )}


                            </div>

                        </div>
                        <div className='SettingInnerPart2'>
                            <div className='SettinIputBox'>
                                <div className='SettingUsername'>
                                    <label>
                                        Username

                                    </label>
                                    <input
                                        placeholder={JSON.parse(localStorage.getItem("user")).username}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                    />

                                </div>
                                <div className='SettingEmail'>
                                    <label>
                                        Email I’d

                                    </label>
                                    <input
                                        placeholder='Add email'
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />

                                </div>
                                <div className='SettingPassword'>
                                    <label>
                                        Password

                                    </label>
                                    <input
                                        placeholder='Change password'
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                    />

                                </div>
                                <div className='SettingButton'>
                                    <button onClick={updateAccount}>
                                        Update
                                    </button>

                                </div>

                            </div>

                        </div>



                    </div>

                </div>

            </section>
            <Footer />
        </>


    )
}