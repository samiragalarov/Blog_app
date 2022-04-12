import { useEffect, useState } from 'react'
import { Post } from '../Post/Post'
import Skeleton from '../skeleton/Skeleton'
import './AllPost.css'
import axios from 'axios'

export function AllPost({ curpage ,catdata}) {
    const [st, setSt] = useState(false)
    const [pag, SetPag] = useState(curpage)
    const [post, setposts] = useState([])

    useState(() => {
        setTimeout(() => {
            setSt(true)

        }, 1000);

    }, [])

    useEffect(()=>{

        setposts(catdata)

    },[catdata])




    async function pagination(e) {

        try {
            const res = await axios.get(`http://localhost:4000/pagination?limit=8&startIndex=${e * 6}`)
            setposts(res.data)




        } catch (err) {
            console.log(err)

        }

    }




    useEffect(() => {
        pagination(0)

    }, [])
    useEffect(() => {
        pagination(curpage)


    }, [curpage])
    function hey() {
        console.log(catdata)
    }
    return (
        <div className="allpost">
             {/* <button onClick={hey}>onClick</button>  */}
            {
                !st ? (
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
                        {post.map((p, index) => (
                            <Post key={index} post={p} />
                        ))}

                    </>

                )

            }




        </div>
    )

}