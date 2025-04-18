import React from 'react'
import { useState } from "react";
import Header from '../../components/Menubar/Header/Header'
import  ExploreItem from '../../components/ExploreItem/ExploreItem'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'
const Home = () => {
  const  [category, setCategory] = useState("All")

  return (
 
   <main className='container'>
    <Header/>
   <ExploreItem category={category} setCategory={setCategory}/>
   <ProductDisplay category={category} searchText={''}/>
   </main>
  )
}

export default Home