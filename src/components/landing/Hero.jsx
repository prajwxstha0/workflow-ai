import { Link } from "react-router-dom"

const Hero = () => {
  return (
      <section id="hero" className="max-w-4xl mx-auto px-6 pt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
              ⚡ AI-powered project management — now in beta
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
        Ship faster.
        <br />
        <span className="text-indigo-600">Together.</span>
      </h1>

      <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
        WorkFlow AI is the project management platform built for modern
        engineering teams. Kanban, sprints, analytics, and AI insights — all
        in one place.
          </p>
          
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          to="/register"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          Start free today →
        </Link>
        <button className="px-6 py-3 rounded-lg border border-gray-200 font-medium text-gray-700 hover:bg-gray-50">
          View demo
        </button>
          </div>
          
    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
        <span className="flex items-center gap-1">✓ No credit card required</span>
        <span className="flex items-center gap-1">✓ Free plan forever</span>
        <span className="flex items-center gap-1">✓ SOC 2 certified</span>
          </div>
          
      </section>
  )
}

export default Hero