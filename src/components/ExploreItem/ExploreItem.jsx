import React from 'react'
import { categories } from '../../assets/assets'
const ExploreItem = () => {
  return (
    <div className="explore-menu position-relative">
        <h1 className="d-flex align-items-center justify-content-between">
            Explore Product
            <div className="d-flex">
            <i className='bi bi-arrow-left-circle scroll-icon'></i>
            <i className='bi bi-arrow-right-circle scroll-icon'></i>
        </div>
        </h1>
       <p>Explore Our Different Product</p>
       <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list">
{
    categories.map((item, index) => (
        <div className="text-center explore-menu-list-item" key={index} >
<img src={item.icon} alt=""  className='rounded-circle' height={128} width={128}/>
<p className='mt-2 fw-bold'>{item.category}</p>
        </div>
        
    ))
}
       </div>
    </div>
  )
}

export default ExploreItem