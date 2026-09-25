
const Features = () => {

  const logos = ["Stripe", "Vercel", "Linear", "Figma", "Notion", "Loom"]

  const features = [
    { icon: "📚", title: "Smart Kanban Boards", desc: "Visualize your workflow with intelligent boards that adapt to your team's unique process and priorities." },
    { icon: "👥", title: "Team Collaboration", desc: "Real-time collaboration tools that keep everyone aligned, from stand-ups to sprint reviews." },
    { icon: "📊", title: "Advanced Analytics", desc: "Deep insights into productivity, velocity, and team performance with beautiful charts." },
    { icon: "🧠", title: "AI-Powered Insights", desc: "WorkFlow AI surfaces blockers, predicts delays, and recommends optimal task assignments." },
    { icon: "🛡️", title: "Enterprise Security", desc: "SOC 2 Type II compliant with SSO, 2FA, audit logs, and granular role permissions." },
    { icon: "🌐", title: "Integrations", desc: "Connect with GitHub, Slack, Figma, Notion, Google Workspace, and 50+ other tools." }
  ];

  return (
    <section className="font-medium" id="features">
      <div className="max-w-7xl mx-auto mb-20 border-t border-b text-center justify-center py-8 border-gray-200 font-medium text-gray-500">
        <h2>TRUSTED BY 12,000+ ENGINEERING TEAMS</h2>

        <div className="flex flex-wrap px-6 mt-5 items-center justify-center gap-15 text-2xl">
          {logos.map((logo) => (
            <span
              key={logo}
              className= " text-gray-300" >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl">Everything your team needs</h1>
        <p className="font-medium text-gray-500 my-10">One platform to plan, track, and ship projects with your entire
          organization.</p>
        
        <div className="max-w-6xl mx-auto px-6 mt-12 mb-20 flex flex-row grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-gray-300 rounded p-6 text-start hover:scale-101 hover:shadow-2xl transition-shadow ">

              <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">{f.icon}</div>
              <h2 className="font-bold">{f.title}</h2>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 h-screen w-full bg-gray-200 grid grid-cols-2 gap-10">
        <div className="flex flex-col py-20 px-4 items-start h-full gap-6">
          <span className="px-3 py-1 border border-blue-300 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold">AI-Powered</span>

          <h1 className="font-extrabold text-4xl">Let AI handle the busywork</h1>

          <p className="text-gray-500"> WorkFlow AI analyzes patterns across thousands of projects to
            predict blockers before they happen, suggest optimal task
            assignments, and auto-generate sprint reports.</p>
          
          <ul className="mt-6 space-y-2 text-sm text-black">
            <li>✓ Auto-assign tasks based on team availability</li>
            <li>✓ Predict sprint delays before they happen</li>
            <li>✓ Auto-generate sprint reports</li>
          </ul>
        </div>
      
        <div className="h-full flex items-center">
          <img className="rounded-3xl" src="https://tse2.mm.bing.net/th/id/OIP.sN7zXFhxCF5nuXoreDGdrwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="no img" />
        </div>
      </div>
    </section>
  )
}

export default Features