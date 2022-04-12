import './Main.css'
import { Navbar } from "../../components/Navbar/Navbar";
import { AllPost } from '../../components/Posts/AllPost';
import { GrAdd } from 'react-icons/gr'
import { Footer } from '../../components/Footer/Footer';
import { CircleEl } from '../../components/CreateCircle/CreateCircle';
import { Addpost } from '../../components/addPost/AddPost';
import { useEffect, useState } from 'react';
import { Post } from '../../components/Post/Post';
import axios from 'axios';
import Skeleton from '../../components/skeleton/Skeleton';



export default function Main() {
  const [popup, Setpopup] = useState(false)
  const [latsposts, setlastposts] = useState([])
  const [post_recive, Setpost_recive] = useState(false)


  useEffect(() => {
    const getposts = async (e) => {
      try {
        const res = await axios.get('http://localhost:4000/getlastest', {
          headers: {
            'Authorization': `token ${JSON.parse(localStorage.getItem("user")).accsesToken}`
          }
        })

        setlastposts(res.data)
        Setpost_recive(true)

        console.log(res.data)

      } catch (err) {
        console.log(err)

      }

    }
    getposts()

  }, [])

  return (
    <>
      <section className='mainPage' >

        <Navbar />
        {
          popup ? (
            <>
              <Addpost popup={popup} Setpopup={Setpopup} />
            </>


          ) : null
        }

        <div className='mainHeader'>
          <div className='mainHeaderText'>
            <h1>
              New blogs to read online and<br />
                create new
            </h1>


          </div>


        </div>
        <CircleEl popup={popup} Setpopup={Setpopup} />
        <div className='postPart'>
          {
            !post_recive ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>

            ) : (
              <>
                {latsposts.map((p, index) => (
                  <Post key={index} post={p} />
                ))}
              </>

            )

          }


        </div>


        <Footer />

      </section>


    </>
  )
}