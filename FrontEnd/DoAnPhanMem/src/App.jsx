import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Login from "./LoginComponent";
import Schedule from "./ScheduleComponent";  
import AddSchedule from "./ScheduleComponent/AddScheduleComponent";
import EditSchedule from "./ScheduleComponent/EditScheduleComponent";
const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/addschedule" element={<AddSchedule />} />
        <Route path="/editschedule" element={<EditSchedule />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
