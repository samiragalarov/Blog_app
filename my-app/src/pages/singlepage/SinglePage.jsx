import { Footer } from '../../components/Footer/Footer'
import { Navbar } from '../../components/Navbar/Navbar'
import { RiDeleteBin6Line } from 'react-icons/ri'
import TextImg from '../../images/image 1.jpg'
import './SInglePage.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

export function SInglePage() {
    const [curtpost, setcurPost] = useState({})
    const PF = "http://localhost:4000/images/";
    useEffect(() => {
        const handelegetSingale = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/getPost/${window.location.pathname.split("/")[2]}`, {
                    headers: {
                        'Authorization': `Basic ${JSON.parse(localStorage.getItem("user")).accsesToken}`
                    }
                })
                console.log(res.data)
                setcurPost(res.data)

            } catch (err) {
                console.log(err)

            }
        }

        handelegetSingale()

    }, [])
    const handleRemove = async (id) => {
        const data = {
            postid: curtpost._id
        }


        const headers = {
            'Authorization': `Basic ${JSON.parse(localStorage.getItem("user")).accsesToken}`
        }
        try {

            const res = await axios.delete(`http://localhost:4000/deleteProduct/${JSON.parse(localStorage.getItem("user")).id}`, { headers, data })


              window.location.replace('http://localhost:3000/')
            console.log(res)

        } catch (err) {
            console.log(err)

        }
    }



    return (
        <>
            <Navbar />
            <section className='SinglePage'>
         
                <div className='SinglePageImages'>
                    <img src={PF + curtpost.photo} />

                </div>
                <div className='SinglePageHead'>
                    <h1>
                        {curtpost.title}
                    </h1>

                </div>
                <div className='SinglePageDelete'>
                    <p>
                        By - {curtpost.owner}  2002
                    </p>
                    {
                        curtpost.owner == JSON.parse(localStorage.getItem("user")).username ? (
                            <RiDeleteBin6Line color='red' size='30' style={{ "cursor": "pointer" }} onClick={handleRemove} />

                        ) : null
                    }



                </div>
                <div className='SinglePageText'>
                    <p>
                        {curtpost.posttext}
                    </p>

                </div>

            </section>
            <Footer />
        </>

    )
}