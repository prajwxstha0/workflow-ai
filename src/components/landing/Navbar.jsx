import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [menuOpen, setmenuOpen] = useState(false)
  
  return (
    <section className=" bg-gray-100 border border-gray-300 top-0 z-99 backdrop-blur sticky">
      <div className="pl-8 w-full h-16 flex items-center justify-between">
        <Link to= "/" className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white text-sm">
            ⚡</div>
          <span className="font-bold text-gray-900">
            WorkFlow <span className="text-indigo-600">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 pr-8  md:flex">
          <a href="#features" className="font-medium text-gray-500 scroll-mt-20">Features</a>
          <a href="#aipowered" className="font-medium text-gray-500">AI powered</a>
          <a href="#pricing" className="font-medium text-gray-500 ">Pricing</a>
          <a href="#faq" className="font-medium text-gray-500">FAQ</a>
          <Link to="/login" className="px-4 py-1 text-sm font-medium text-blue-800 border border-blue-800 rounded-lg hover:bg-blue-100">
            Log in</Link>
          
          <Link to="/register" className="px-4 py-1 text-sm font-medium text-blue-800 border border-blue-800 rounded-lg hover:bg-blue-100">
            Get Started</Link>
        </div>

        <button
          className="pr-8 md:hidden relative"
          onClick={ () => setmenuOpen(!menuOpen)}
        >
          {menuOpen ? (
              <span>✕</span>
          ) : (
              <span>☰</span>
          )}
        </button>

        {menuOpen && (
        <div className="absolute right-15 top-7 border-t border-gray-200 bg-white px-4 py-5 shadow-lg md:hidden">
          
          <div className="flex flex-col gap-4">

            <a
              href="#features"
              onClick={() => setmenuOpen(false)}
              className="font-medium text-gray-600 hover:text-indigo-600"
            >
              Features
            </a>

            <a
              href="#aipowered"
              onClick={() => setmenuOpen(false)}
              className="font-medium text-gray-600 hover:text-indigo-600"
            >
              AI powered
            </a>

            <a
              href="#pricing"
              onClick={() => setmenuOpen(false)}
              className="font-medium text-gray-600 hover:text-indigo-600"
            >
              pricing
            </a>

            <a
              href="#faq"
              onClick={() => setmenuOpen(false)}
              className="font-medium text-gray-600 hover:text-indigo-600"
            >
              FAQ
            </a>

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">

              <Link
                to="/login"
                onClick={() => setmenuOpen(false)}
                className="w-full rounded-lg border border-indigo-600 px-4 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Log in
              </Link>

              <Link
                to="/register"
                onClick={() => setmenuOpen(false)}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>

            </div>
          </div>
        </div>
      )}

        
      </div>
    </section>
  )
}

export default Navbar