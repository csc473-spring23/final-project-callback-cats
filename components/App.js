import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
  import Navbar from './components/Navbar'
  import About from './components/About'
  
  
  const App = () => {
    return (
    <Router>
          {/* <Link to='/home'>Home</Link> */}
          {/* <Link to='/about'>About</Link> */}
  
          <Routes>
          {/* <Route path='/home' element={<Home/>} /> */}
          <Route path='/about' element={<About/>} />
        
          </Routes>
          </Router>
    );
  };
  
  export default App;