import './AddPost.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import axios from "axios";

export function Addpost({ popup, Setpopup }) {
    const [header, Setheader] = useState("")
    const [text, SetText] = useState("")
    const [cat, Setcat] = useState("football")
    const [file, setFile] = useState(null);
    function closePopup() {
        Setpopup(false)

    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title: header,
            posttext: text,
            categories: cat,
            owner: JSON.parse(localStorage.getItem("user")).username,
            ownerid : JSON.parse(localStorage.getItem("user")).id,

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
            const res = await axios.post("http://localhost:4000/createProduct", newPost, {
                headers: {
                    'Authorization': `Basic ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                }
            });
            console.log(res)
             window.location.replace("/singlepage/" + res.data._id);
        } catch (err) { console.log(err) }
    };
  

  

    return (
        <div className='addPost'>
            <AiOutlineCloseCircle className='closeButton' size={30} onClick={closePopup} />
            <h1>
                New Post

            </h1>

            <div>
                <select onChange={(e) => { Setcat(e.target.value) }}>
                    <option>football</option>
                    <option>science</option>
                    <option>news</option>
                </select>



            </div>

            <input
                className='AddpostInput'
                placeholder='Head'
                onChange={(e) => { Setheader(e.target.value) }}
            />
            <textarea placeholder='Teactfield'
                onChange={(e) => { SetText(e.target.value) }}

            >

            </textarea>

            <div className='PopupButtonBox'>
                <input type="file"

                    onChange={(e) => setFile(e.target.files[0])}

                />
                <button className='PopupButton' onClick={handleSubmit}>Post</button>

            </div>


        </div>
    )
}

