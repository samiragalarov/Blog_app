import Main from "./pages/Main/Main";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { SInglePage } from "./pages/singlepage/SinglePage";
import { Setting } from "./pages/setting/Setting";
import { AllPostPage } from "./pages/AllPostsPages/AllPostsPages";
import { Context } from './context/Context';
import { useContext } from "react";




function App() {
  const { user } = useContext(Context);


  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* <Route path="/" element={<Main/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/singlePage" element={<SInglePage/>}/>
              <Route path="/setting" element={<Setting/>}/>
              <Route path="/allpost" element={<AllPostPage/>}/> */}
          <>
            {
              !user && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>


              )
            }
            {
              user && (
                <>
                  <Route path="/" element={<Main />} />
                  <Route path="/singlePage/:id" element={<SInglePage />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/allpost" element={<AllPostPage />} />
                </>


              )


            }



            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />

          </>


        </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;
