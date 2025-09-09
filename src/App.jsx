import Login from "./components/Login"
import AdminDashboard from "./components/AdminDashboard"
import CustomerDashboard from "./components/CustomerDashboard"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"
import LoginProtect from "./protectedRoutes/LoginProtect"
import Signup from "./components/Signup"
import TaskForm from "./components/form"
import TicketDetail from "./components/TicketDetails"


const App = () => {
  return (

    <Routes>


      <Route path='/' element={<LoginProtect> <Signup /> </LoginProtect>}></Route>

      <Route path='/login' element={<LoginProtect><Login /></LoginProtect> }></Route>


      <Route
        path="/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />




      <Route
        path="/customer"
        element={
          <ProtectedRoute role="Customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/form" element={<TaskForm/>}/>

      <Route path="/ticket/:id" element={<TicketDetail />} />
      




    </Routes>


  )
}

export default App
