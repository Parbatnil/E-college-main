import React from 'react'
import { mentors } from '../../../assets/Assets'

const Mentors = () => {
  return (
    <div>
        <div className=' flex justify-center items-center pt-10'>
            <h1 className='mb-8 text-center text-3xl lg:text-4xl'>Mentors</h1>
            </div>
        
            {mentors.map((items)=>(
                 <div key={items.id} className=' flex justify-center items-center px-0  my-2 sm:px-3' >
                   <div className=' container mt-2 mx-3 ' > 
                   <div className=' overflow-hidden rounded-3xl min-h-[200px] sm:min-h-[250px] hero-ag-color flex justify-center items-center '>
            <div className=' container pb-8 sm:pb-0 relative'>


                <div className=' flex flex-col sm:flex-row items-center gap-1 sm:gap-3 '>
                 <img src={items.image} alt={items.name} className='max-h-[150px] sm:max-h-[270px] w-40 sm:w-72 rounded-xl sm:ml-4 ml-2 mt-2 ' />
                 <h3 className=' mb-2 text-xl sm:text-3xl  text-nowrap'>{items.name}</h3>
                 <p className='mb-2 p-3 text-sm sm:text-lg text-nowrap '>{items.title}</p>
                 <p className='mb-12 p-4 text-sm sm:text-lg lg:block hidden'>{items.description}</p>
                 <button  className='lg:block  mr-16 hidden relative right-5 bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8  rounded-full '>Message</button>
                 <div className=' flex justify-center'>
                 <button  className=' lg:hidden  mt-4  text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 mx-2 rounded-full relative right-0 sm:right-40 top-0 sm:top-16 '>Message</button>
                 </div>
                 
                 </div>
                 </div>
                 </div>
                 </div>
                 </div>
            ))}
   
    
    </div>
  )
}

export default Mentors