
import './App.css';
import {Header} from "./components/Header";
import { Route, Routes} from 'react-router-dom'

import {Registration} from './pages/registration'
import {Home} from './pages/home'
import {LoginPage} from "./pages/login";
import {Reading} from "./pages/courses/reading";
import {Programming} from "./pages/courses/programming";
import {Math} from "./pages/courses/math";
import {Mental} from "./pages/courses/mental";
import {Russian} from "./pages/courses/russian";
import {School} from "./pages/courses/school";
import {English} from "./pages/courses/english";
import {Fastreading} from "./pages/courses/fastreading";
import {Drawing} from "./pages/courses/drawing";
import {Account} from "./pages/account";
import {HomePage} from "./pages/HomePage"
import {Cart} from "./components/Cart";
import {Watch} from "./pages/watch"

function App() {
  return (
      <>

          <div className="wrapper">
              <Routes>
                  <Route path="/" element={<Header />}>
                      <Route index element={<Home />} />
                      <Route path="homepage" element={<HomePage />} exact/>
                      <Route path="registration" element={<Registration />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="reading" element={<Reading />} />
                      <Route path="math" element={<Math />} />
                      <Route path="mental" element={<Mental />} />
                      <Route path="programming" element={<Programming />} />
                      <Route path="russian" element={<Russian />} />
                      <Route path="school" element={<School />} />
                      <Route path="english" element={<English />} />
                      <Route path="fastreading" element={<Fastreading />} />
                      <Route path="drawing" element={<Drawing />} />
                      <Route path="account" element={<Account />} />
                      <Route path="cart" element={<Cart />} />
                      <Route path="watch" element={<Watch />} />
                  </Route>
              </Routes>


      </div>

      </>

  );
}

export default App;
