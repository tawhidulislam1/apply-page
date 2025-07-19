import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
        navigate("/apply");

      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed",
          text: err.message,
          icon: "error",
          confirmButtonColor: "#10B981",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#10B981] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              className="input input-bordered w-full border-gray-300 focus:border-[#10B981] focus:outline-none"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full border-gray-300 focus:border-[#10B981] focus:outline-none"
              required
            />
            <label className="label justify-end">
              <a href="#" className="text-xs text-[#10B981] hover:underline">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="btn bg-[#10B981] hover:bg-emerald-600 text-white border-none w-full"
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/admin/register"
              className="text-[#10B981] font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
