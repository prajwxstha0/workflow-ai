import { Link } from "react-router-dom"

const Pricing = () => {

    const plans = [
{
    name: "Starter",
    price: "Free",
    moto: "Perfect for small teams getting started.",
    payment: "Get Started Free",
    features: ["Up to 5 members", "3 projects", "Basic analytics", "2GB storage", "Community support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    moto: "For growing teams that need more power.",
    payment: "Start free trail",
    features: ["Unlimited members", "Unlimited projects", "Advanced analytics", "50GB storage", "Priority support", "AI insights", "Custom workflows"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
      moto: "For organizations with advanced needs.",
    payment: "Contact Sales",
    features: ["Everything in Pro", "SSO & SAML", "Audit logs", "Dedicated CSM", "SLA guarantee", "Custom integrations", "On-premise option"],
    highlighted: false,
  },
    ]

  return (
      <section id="pricing" className="flex flex-col py-20 px-8 border-t">
          <div className="flex flex-col text-center w-full gap-6 bg-amber-100">
              <h1 className="font-extrabold text-4xl">Simple, transparent pricing</h1>
              <p className="font-medium text-gray-400">Pick the plan that fits your team.</p>
          </div>

          <div className="px-6 grid gap-5 mt-15 md:grid-cols-3  ">
              {plans.map((plan) => (
                  <div
                      key={plan.name}
                      className={` rounded-3xl px-10 py-10 flex flex-col gap-3
                         ${plan.highlighted ? "border-indigo-600 border-2 shadow-xl ring-1 ring-indigo-600"
                              : "bg-gray-50"}`}>
                      
                      <h1 className={`font-bold 
                        ${plan.highlighted ? "text-indigo-500" : "text-black"}`}>{plan.name}</h1>

                      <span className="text-5xl font-bold">
                          {plan.price}
                          {plan.highlighted
                              && <span>
                                  /user/mo
                              </span>}
                      </span>

                      <p className="font-medium text-gray-600">{plan.moto}</p>

                      <Link to="/register"
                          className={`text-center font-medium inline-block border p-4 rounded-2xl cursor-pointer
                                    ${
                              plan.highlighted ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                  : "border border-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}>
                          {plan.payment}
                      </Link>
                      
                      <ul className="font-medium flex flex-col gap-3"> 
                          {plan.features.map((f) => (
                              <li>
                                  <span>✓</span>
                                  {f}
                              </li>
                          ))}
                      </ul>

                  </div>
              ))}
          </div>
      </section>
  )
}

export default Pricing