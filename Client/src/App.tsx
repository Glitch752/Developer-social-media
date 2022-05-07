import './App.css';
import { BrowserRouter, Routes, Route, NavigateFunction, useNavigate } from 'react-router-dom';

// @ts-ignore
import NotFound from './pages/NotFound.tsx';
// @ts-ignore
import Login from './pages/Login.tsx';
// @ts-ignore
import Feed from './pages/Feed.tsx';
import { useEffect, useLayoutEffect, useRef } from 'react';
//@ts-ignore
import User from './pages/User.tsx';

const apiLink = "http://localhost:25564/api/v1/";

function App() {
  /**
   * @function authentication
   * @param {NavigateFunction} navigate The object reference to allow page navigation.
   * @param {number} intention The level of access requested by user. 0 = general user access, 1 = admin level access, 2 = super admin level access.
   */
  async function authentication(navigate: NavigateFunction, intention: number, callback: () => void = () => {}) {
    // Intention is the level of access requested by the user.

    let data = { authKey: getCookie('authKey'), intention: intention };

    const response = await fetch(apiLink + "auth/verify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();

    if(!json.success) {
        console.error("Error: " + json.response);
        navigate("/login");
    } else {
        callback();
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Redirect authentication={authentication} />} />
          <Route path="/login" element={<Login authentication={authentication} />} />
          <Route path="/feed" element={<Feed authentication={authentication} />} />
          <Route path="/user/:userID" element={<User authentication={authentication} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Redirect(props) {
  let navigate = useNavigate();

  useLayoutEffect(() => {
    props.authentication(navigate, 0, () => {
      navigate("/feed");
    });
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export const useEffectOnce = ( effect: ()=>( void | (()=>void) ) )=> {

  const destroyFunc = useRef<( void | (()=>void) )>();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
      renderAfterCalled.current = true;
  }

  useEffect( ()=> {
      if (calledOnce.current) { 
          return; 
      }

      calledOnce.current = true;
      destroyFunc.current = effect();

      return ()=> {
          if (!renderAfterCalled.current) {
              return;
          }

          if (destroyFunc.current) {
              destroyFunc.current();
          }
      };
  }, []);
};

export default App;