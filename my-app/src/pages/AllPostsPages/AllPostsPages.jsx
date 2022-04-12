import { Footer } from '../../components/Footer/Footer'
import { Navbar } from '../../components/Navbar/Navbar'
import { AllPost } from '../../components/Posts/AllPost'
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import './AllPostsPages.css'
import { Post } from '../../components/Post/Post';
import { CircleEl } from '../../components/CreateCircle/CreateCircle';
import { Addpost } from '../../components/addPost/AddPost';

export function AllPostPage() {
    const [curpage ,Setcurpage] = useState(0)
    const [popup, Setpopup] = useState(false)
    const [catdata ,setcatdata] = useState([])
    const handleCategory = async (e) => {
       

        try {
            if(e == 'All'){
                window.location.reload("http://localhost:3000/allpost")
            }
          
            const res = await axios.get(`http://localhost:4000/getbyCategory/?cat=${e}`)
            setcatdata(res.data)


            console.log(res)

        } catch (err) {
            console.log(err)

        }



    }
    



 
    
    return (
        <>
            <Navbar />
            <section className='AllPotsPage'>
            {
          popup ? (
            <>
              <Addpost popup={popup} Setpopup={Setpopup}  />
            </>


          ) : null
        }

            <CircleEl popup={popup} Setpopup={Setpopup} />
            <div className='productshead'>
                    <h1>AllPost</h1>
                    <div className='selectdiv' >
                        <select id='category'  onChange={(e) => { handleCategory(e.target.value) }} >
                            <option  >
                              All
                            </option>
                            <option>
                            science
                            </option>
                            <option>
                            news
                            </option>
                           
                        </select>

                    </div>

                </div>
                <AllPost curpage={curpage}  catdata={catdata}/>
                <div className='paginationa'>
                  

                    <div className="pagination">
                        <a href="#">&laquo;</a>
                        <a  className="paginationnumber" onClick={()=>{Setcurpage(0)}}  id='0' >1</a>
                        <a value="2" id="1" onClick={()=>{Setcurpage(1)}} >2</a>
                        <a value="3" id="2" onClick={()=>{Setcurpage(2)}} >3</a>
                        <a value="4" id="3" onClick={()=>{Setcurpage(3)}}>4</a>
                        <a value="5" id="4" onClick={()=>{Setcurpage(4)}} >5</a>
                        <a value="6" id="5" onClick={()=>{Setcurpage(5)}} >6</a>
                        <a href="#">&raquo;</a>
                    </div>

                </div>
        
                

               

            </section>
            <Footer />
        </>


    )
}