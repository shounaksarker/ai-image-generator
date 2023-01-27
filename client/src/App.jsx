import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import logo from "./assets/logo.svg"
import snk from "./assets/snk.png"
import {CreatePost} from "./pages"

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to=''>
          <img src={logo} alt="logo" className="w-28 object-contain"/>
        </Link>

        <Link to="/" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Up Comming...</Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] md:min-h-[85vh]">
        <Routes>
          <Route path="/" element={<CreatePost/>} />
        </Routes>
      </main>

      <footer className='bg-[#f9fafe] h-[50px]'>
        <a href="https://www.fb.me/shounak.sarker" target="_blank" className='float-right lg:mr-[50px]'>
        <img src={snk} alt="snk" className='w-[150px] '/>
        </a>
      </footer>
    </BrowserRouter>
  );
};

export default App;