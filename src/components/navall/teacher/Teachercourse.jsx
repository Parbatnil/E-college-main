import React from 'react'
import Navbar from '../../../components/Navbar'
import { Tcourse } from '../../../assets/Assets'
import { useNavigate } from 'react-router-dom';
import TeacherNav from '../../TeacherNav';
const Teachercourse = () => {
    const navigate= useNavigate();
  return (
    <div>
        <TeacherNav/>
        <section className='pt-10 mx-3 mb-4'id='project'>
        <h2 className='mb-8 text-center text-3xl lg:text-4xl'>Course(Teacher)</h2>
        <div className='flex  items-center justify-center px-0 sm:px-7'>
        <div className=' grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Tcourse.filter((project) =>{
                    
                    if(project.title1.toLowerCase().includes("xt".toLowerCase())){
                      return project;}
                  })
            
            .map((project)=>(
                <div key={project.id} className='group relative overflow-hidden rounded-3xl'>
                    <img src={project.image} alt={project.name} className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' />
                <div className=' absolute inset-0 flex flex-col items-center justify-center text-white opacity-100 backdrop-blur-lg transition-opacity duration-500 '>
                    <h3 className=' mb-2 text-3xl'>{project.name}</h3>
                    <p className='mb-12 p-4 text-sm sm:text-lg'>{project.description}</p>
                    <a onClick={()=> navigate(project.Link)} target='_blank' rel='noopener noreferrer' className=' rounded-full bg-white px-4 py-2 text-black hover:bg-gray-300'>
                        <div className=' flex items-center'>
                            <span className=' cursor-pointer'>View Course</span>
                            {/* <MdArrowOutward/> */}
                        </div>
                    </a>
                </div>
                </div>
            ))}
        </div>
        </div>
    </section>
    </div>
  )
}

export default Teachercourse