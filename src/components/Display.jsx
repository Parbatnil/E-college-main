import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DisplayHome from './navall/DisplayHome'
import Guardian from './navall/Guardian'
import Teacher from './navall/Teacher'
import Admin from './navall/Admin'
import Management from './navall/Management'
import Student from './navall/student/Student'
import Studentdashbord from './navall/Studentdashbord'
import Bca from './course/Bca'
import Mca from './course/Mca'
import Btech from './course/Btech'
import Mtech from './course/Mtech'
import Bba from './course/Bba'
import Mba from './course/Mba'
import Course from './course/Course'
import Search from './search/Search'
import Teachercourse from './navall/teacher/Teachercourse'
import Bcateacher from './navall/teacher/Bcateacher'
import Mcateacher from './navall/teacher/Mcateacher'
import Btechteacher from './navall/teacher/Btechteacher'
import Mtechteacher from './navall/teacher/Mtechteacher'
import Bbateacher from './navall/teacher/Bbateacher'
import Mbateacher from './navall/teacher/Mbateacher'
import Mcalive from './navall/teacher/Mcalive'
import Bcalive from './navall/teacher/Bcalive'
import Bcaclass from './course/Bcaclass'
import Mcaclass from './course/Mcaclass'
import TeacherDashboard from './navall/admin/TeacherDashboard'
import TeachersDataPage from './navall/admin/TeachersDataPage'
import AdminDashboard from './navall/admin/AdminDashboard'
import TeacherRegister from './navall/admin/TeacherRegister'
import Mcaexam from './course/Mcaexam'
import Mcateacherexam from './navall/teacher/Mcateacherexam'
import Attendence from './navall/teacher/Attendence'
import Mark from './navall/teacher/Mark'
import Managementcontacts from './navall/teacher/Managementcontacts'
const Display = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<DisplayHome/>} />
        <Route path='/guardian' element={<Guardian/>} />
        <Route path='/teacher' element={<Teacher/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/management' element={<Management/>} />
        <Route path='/student' element={<Student/>} />
        <Route path='/studentdashbord' element={<Studentdashbord/>} />
        <Route path='/bca' element={<Bca/>} />
        <Route path='/mca' element={<Mca/>} />
        <Route path='/b.tech' element={<Btech/>} />
        <Route path='/m.tech' element={<Mtech/>} />
        <Route path='/bba' element={<Bba/>} />
        <Route path='/mba' element={<Mba/>} />
        <Route path='/course' element={<Course/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/teachercourseok@24' element={<Teachercourse/>} />
        <Route path='/bcateacherok@24' element={<Bcateacher/>} />
        <Route path='/mcateacherok@24' element={<Mcateacher/>} />
        <Route path='/b.techteacherok@24' element={<Btechteacher/>} />
        <Route path='/m.techteacherok@24' element={<Mtechteacher/>} />
        <Route path='/bbateacherok@24' element={<Bbateacher/>} />
        <Route path='/mbateacherok@24' element={<Mbateacher/>} />    
        <Route path='/mcaliveok@24' element={<Mcalive/>} /> 
        <Route path='/bcaliveok@24/:registerNumber' element={<Bcalive/>} />  
        <Route path='/bcaClassok@24@27' element={<Bcaclass/>} /> 
        <Route path='/mcaClassok@24@27' element={<Mcaclass/>} /> 
        <Route path="/dashboard/:registerNumber" element={<TeacherDashboard />} />
        <Route path="/teachers-data" element={<TeachersDataPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/mcaeaxm@24" element={<Mcaexam/>} />
        <Route path="/mcateachereaxm@24" element={<Mcateacherexam/>} />
        <Route path="/attendence" element={<Attendence/>} />
        <Route path="/mark" element={<Mark/>} />
        <Route path="/managementcontacts" element={<Managementcontacts/>} />
      </Routes>
    </div>
  )
}

export default Display