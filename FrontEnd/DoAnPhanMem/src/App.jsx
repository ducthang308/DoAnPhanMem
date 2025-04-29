import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Login from "./LoginComponent";
import Schedule from "./ScheduleContentComponent";  
import AddSchedule from "./AddScheduleContentComponent";
import EditSchedule from "./EditScheduleContentComponent";
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
