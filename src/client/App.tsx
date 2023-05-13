import Home from "./Homepage/Home";

import Adoptpage from "./Adopt_page/Adoptpage";
import Donatepage from "./Donate_page/Donatepage";
import Catfactspage from "./Catfacts_page/Catfactspage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import UserInfo from "./User_info/Userinfo";
import Errorpage from "./Error_page/Errorpage";

import { AuthProvider } from "./Context/AuthProvider";
import UserRequired from "./UserRequired/UserRequired";

import "./index.css";

import { Routes, Route, RouteProps } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/adopt" element={<Adoptpage />}></Route>
          <Route path="/donate" element={<Donatepage />}></Route>
          <Route path="/catfacts" element={<Catfactspage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userinfo" element={<UserInfo />}></Route>
          <Route element={<UserRequired />}>
            <Route path="/donate" element={<Donatepage />}></Route>
            <Route path="/userinfo" element={<UserInfo />}></Route>
          </Route>
          <Route path="*" element={<Errorpage />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
