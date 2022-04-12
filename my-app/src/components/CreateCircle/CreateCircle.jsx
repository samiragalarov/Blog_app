import './CreateCircle.css'
import {IoMdAdd} from 'react-icons/io'


export function CircleEl({popup,Setpopup}){
    function openPopup(){
        Setpopup(true)
    }
    return(
        <div className='dot' onClick={openPopup} >
            <IoMdAdd  size={42} color='yellow'/>
         

        </div>
    )
}