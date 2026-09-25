import { useState } from "react"

const FAQ = () => {

    const [open, setopen] = useState(null)

    const faqs = [
  { q: "Is there a free plan?", a: "Yes — the Free plan is free forever, no credit card required." },
  { q: "How does the AI work?", a: "WorkFlow AI analyzes your project data to predict blockers, suggest task assignments, and generate reports." },
  { q: "What integrations are available?", a: "GitHub, Slack, Figma, Notion, Google Workspace, and 50+ other tools." },
  { q: "Is my data secure?", a: "We're SOC 2 Type II compliant with SSO, 2FA, and audit logs." },
    ]

  return (
      <section id="faq" className="mx-auto px-8 flex flex-col text-center gap-10">
          
          <h1 className="text-4xl">
              Frequently asked questions
          </h1>

          <div>
              {faqs.map((item, i) => (
                  <div
                      key={item.a}
                      className="border-b border-gray-200" >

                      <button
                          className=" w-full flex text-left justify-between py-4 text-left font-semibold text-gray-900"
                          onClick={() => {
                          setopen(open === i? null: i)
                      }}>
                          {item.q}
                          <span
                              className="mb-5">
                              {open === i? "▲" : "▼"}
                          </span>
                      </button>

                      {open === i && (
                          <p className="flex">{item.a}</p>
                      )}
                  </div>
              ))}
          </div>

      </section>
  )
}

export default FAQ