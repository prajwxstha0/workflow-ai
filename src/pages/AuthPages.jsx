import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

const stats = [
  { value: "40%", label: "faster delivery" },
  { value: "12k+", label: "teams worldwide" },
  { value: "4.9★", label: "average rating" },
];

const checklist = [
  "Unlimited projects & tasks",
  "Real-time team collaboration",
  "AI-powered insights & reports",
  "GitHub, Slack & 50+ integrations",
  "SOC 2 certified & GDPR compliant",
];

const AuthPages = () => {
  const location = useLocation();
  const initialMode = location.pathname === "/login" ? "login" : "register";
  const [mode, setMode] = useState(initialMode);
  return <div>{mode === "login" ? <LoginForm /> : <RegisterForm />}</div>;

  function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setsetRememberMe] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        await loginUser({ email, password, rememberMe });
        navigate("/dashboard");
      } catch (err) {
        setError(mapAuthError(err.code));
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }

    return (
      <section className="grid grid-cols-2">
        <div className="flex flex-col text-md justify-center px-5 h-screen">
          <Link to="/" className="flex items-center gap-2 mb-5 w-fit">
            <div className="w-6 h-6  rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white text-sm">
              ⚡
            </div>
            <span className="font-bold text-md text-gray-900">
              WorkFlow <span className="text-indigo-600">AI</span>
            </span>
          </Link>

          <h1 className="text-2xl font-extrabold text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-gray-500 font-medium text-[12px]">
            Sign in to your account to continue.
          </p>

          <button
            type="button"
            className="mt-4 flex items-center justify-center border border-gray-200 rounded-lg py-1 font-bold text-[14px] text-gray-800 hover:bg-gray-50"
          >
            ☣️ Continue with Google
          </button>

          <div className="my-6 flex items-center gap-2 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            or continue with email
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {error && <div className="text-red-400">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="font-bold text-[12px] space-y-2"
          >
            <div>
              <label className="">Email address</label>
              <input
                type="email"
                placeholder="abc@workflow.ai"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute top-8 right-3 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <div className="flex text-center justify-between">
              <label className="flex items-center gap-2 font-medium text-gray-400">
                <input
                  checked={rememberMe}
                  onClick={(e) => {
                    console.log(e);
                    setsetRememberMe(e.target.checked);
                  }}
                  type="checkbox"
                />
                Remember Me
              </label>
              <a href="#" className="text-indigo-600">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 rounded-full py-2 text-white"
            >
              {loading ? "In Process" : "Sign In"}
            </button>
          </form>

          <span className="flex mt-6 font-bold text-[12px] gap-3">
            <p>Dont have an account?</p>
            <Link
              onClick={() => {
                setMode("register");
              }}
              className="text-indigo-700"
              to="/register"
            >
              Create one free
            </Link>
          </span>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center p-8 bg-gradient-to-br from-indigo-700 via-indigo-500 to-cyan-400 text-white">
          <h1 className="text-2xl flex text-center">
            Manage your projects with AI precision
          </h1>
          <p className="font-bold text-[12px] flex text-center text-gray-200">
            Join 12,000+ engineering teams who ship 40% faster with WorkFlow AI.
          </p>

          <div className="flex flex-col gap-4 mt-5 w-full">
            {stats.map((state) => (
              <div
                key={state.value}
                className=" flex gap-5 items-center px-5 py-2 rounded bg-white/10 backdrop-blur-md border-white/20"
              >
                <h1 className="text-2xl">{state.value}</h1>
                <p className="font-bold text-[12px] text-gray-200">
                  {state.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

    function mapAuthError(code) {
      switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          return "Incorrect email or password.";
        case "auth/too-many-requests":
          return "Too many attempts. Try again later.";
        case "auth/invalid-email":
          return "That email address looks invalid.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
  }

  function RegisterForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();

      function timeout() {
        setTimeout(() => {
          setError("");
        }, 2000);
      }

      setError("");

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        timeout();
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords don't match.");
        timeout();
        return;
      }

      setLoading(true);
      try {
        await registerUser({ firstName, lastName, email, password });
        navigate("/dashboard");
      } catch (err) {
        setError(mapAuthError(err.code));
      } finally {
        setLoading(false);
        timeout();
      }
    }

    return (
      <section className="grid grid-cols-2 h-screen relative">
        {error && (
          <button className="absolute top-5 rounded p-2 text-red-600 left-50 bg-green-100 ">
            {error}
          </button>
        )}
        {/* left panel — form */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white px-16 py-12">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-sm">
              ⚡
            </div>
            <span className="font-bold text-lg">WorkFlow AI</span>
          </Link>

          <h1 className="text-2xl font-extrabold leading-tight">
            Everything you need to manage projects at scale
          </h1>
          <p className="mt-2 text-gray-400 max-w-sm font-medium">
            Set up your workspace in minutes. No credit card required.
          </p>

          <ul className="mt-10 space-y-4">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-300">
                <span className="text-green-400">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/*right panel*/}
        <div className="flex flex-col py-10 px-10 font-normal gap-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-400">
            Start your free 14-day Pro trial. No card needed.
          </p>
          <button className="border border-gray-300 rounded py-2 font-bold text-[12px]">
            🥇 Sign up with Google
          </button>
          <div className="border-b border-gray-200 mb-6 mt-6 relative flex justify-center w-full bg-amber-50">
            <span className="absolute -top-3.5 bg-white w-10 flex justify-center">
              or
            </span>
          </div>

          {/* input filled */}
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[12px] font-bold">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="bg-gray-50 mb-3 px-3 py-1 border border-gray-200 rounded-2xl focus:outline-none focus:shadow shadow-blue-200"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-bold">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="bg-gray-50 mb-3 px-3 py-1 border border-gray-200 rounded-2xl focus:outline-none focus:shadow shadow-blue-200"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[12px] font-bold">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 mb-3 px-3 py-1 border border-gray-200 rounded-2xl focus:outline-none focus:shadow shadow-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[12px] font-bold">Company Name</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                className="bg-gray-50 mb-3 px-3 py-1 border border-gray-200 rounded-2xl focus:outline-none focus:shadow shadow-blue-200"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="text-[12px] font-bold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className=" bg-gray-50 mb-3 px-3 py-1 border border-gray-200 rounded-2xl focus:outline-none focus:shadow shadow-blue-200"
              />
              <button
                type="button"
                className="absolute right-5 top-5.5 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <div className="flex flex-col relative">
              <label className="text-[12px] font-bold">Confirm Password</label>
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="bg-gray-50 mb-3 px-3 py-1 border border-gray-200 rounded-2xl focus:outline-none focus:shadow shadow-blue-200"
              />
              <button
                type="button"
                className="absolute right-5 top-5.5 cursor-pointer"
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
              >
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>

            <button
              disabled={loading}
              className="bg-indigo-600 text-white w-full rounded-full py-2 font-bold"
            >
              {loading ? "Creating user" : "Create free account"}
            </button>
          </form>

          <div className="flex justify-center mt-5 text-[13px] gap-2 text-gray-500">
            <p className="">Already have an account?</p>
            <Link
              onClick={() => {
                setMode("login");
              }}
              to={"/login"}
              className="text-blue-600 font-bold"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function mapAuthError(code) {
    switch (code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/popup-closed-by-user":
        return "Google sign-up was cancelled.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
};

export default AuthPages;
