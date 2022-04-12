import './Post.css'
import postImage from '../../images/Ekran Resmi 2022-03-23 15.30.37.png'


export function Post({ post }) {
    const PF = "http://localhost:4000/images/";
   


    return (
        <div className="Post">

            <div className="imageSection">
                <img src={PF + post.photo} />


            </div>
            <div className="textSection">
                <h3>
                    {post.title}
                </h3>
                <p>
                    {post.posttext}
                </p>

            </div>
            <div className="buttonSection">

                <button>
                    <a  href={`http://localhost:3000/singlePage/${post._id}`}>  
                        
                         Read More

                    </a>



                </button>


            </div>

        </div>
    )
}