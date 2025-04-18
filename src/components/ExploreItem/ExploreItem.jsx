import React, { useRef } from 'react'

import { categories } from '../../assets/assets'
import './ExploreItem.css'
const ExploreItem = ({category ,setCategory}) => {
    const menuRef = useRef(null)
    const scrollRight = () => {
        if(menuRef.current){
            menuRef.current.scrollBy({ left: 200, behavior: 'smooth' });

           }
    }
    const scrollLeft = () => {
       if(menuRef.current){
        menuRef.current.scrollBy({ left: -200, behavior: 'smooth' });

       }
    }
  return (
    <div className="explore-menu position-relative">
        <h1 className="d-flex align-items-center justify-content-between">
            Explore Product
            <div className="d-flex">
            <i className='bi bi-arrow-left-circle scroll-icon' onClick={scrollLeft}></i>
            <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
        </div>
        </h1>
       <p>Explore Our Different Product</p>
       <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list " ref={menuRef}>
{
    categories.map((item, index) => (
        <div className="text-center explore-menu-list-item" key={index} onClick={()=>{
            
            setCategory(prev=>prev===item.category?'All':item.category)
            console.log(category)
        }
        
       
        
        } >
<img src={item.icon} alt=""  className={item.category===category? 'rounded-circle active':'rounded-circle'} height={128} width={128}/>
<p className='mt-2 fw-bold'>{item.category}</p>
        </div>
        
    ))
}
       </div>
       <hr />
    </div>
  )
}

export default ExploreItem