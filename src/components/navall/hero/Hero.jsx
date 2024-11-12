import React from 'react'
import img1 from '../../../assets/hero.jpg'
import Slider from "react-slick"
import { useNavigate } from 'react-router-dom';
const HeroData=[
    {
        id:1,
        Image:img1,
        subtitle:"Best Quality Education",
        title:"Is More Easier",
        title2:"Course",
        description: "And Cost-effective",
        path:"/course"
    },
]

const Hero = () => {
    const navigate= useNavigate();

    // const settings={
    //       dots: true,
    //     arrows:false,
    // infinite: true,
    // speed: 800,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // autoPlaySpeed:4000,
    // cssEase:"ease-in-out",
    // pauseOnHover:false,
    // pauseOnFocus:true,
    // };

  return (
    <>
    <div className=' flex justify-center items-center px-0 sm:px-3'>
    <div className=' container mt-2 mx-3 ' >
        <div className=' overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center '>
            <div className=' container pb-8 sm:pb-0'>
            {/* Hero */}
            {/* <Slider {...settings}> */}
            {HeroData.map((data)=>( 
                <div key={data.id}>
                    <div className=' grid grid-cols-1 sm:grid-cols-2'>
                        {/* text contener */}
                        <div className='flex justify-center flex-col gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1  '>
                        <h1  className=' text-2xl sm:text-6xl md:text-3xl lg:text-2xl font-bold'>{data.subtitle}</h1>
                        <h1  className=' text-4xl sm:text-6xl lg:text-7xl font-bold sm:p-10 '>{data.title}</h1>
                        <h1  className='text-6xl uppercase text-gray-500  sm:text-[80px] md:text-[80px] xl:text-[150px] font-bold'>{data.title2}</h1>
                        {/* <h1  className=' text-2xl sm:text-6xl lg:text-4xl font-bold'>{data.description}</h1> */}
                        <div  className='pt-10 sm:pt-40'>
                            <div className=' flex justify-center'>
                            <button onClick={()=> navigate(data.path)}  className='bg-primary text-white bg-orange-500 cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full '>Check Now</button>
                            </div>
                        </div>
                        </div>
                        {/* img section */}
                        <div className=' order-1 sm:order-2'>
                            <div >
                                <img src={data.Image} alt="" 
                                className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto  sm:drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] rounded-full px-1'/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
              {/* </Slider> */}
            </div> 
        </div>
    </div>
    </div>
    </>
  )
}

export default Hero