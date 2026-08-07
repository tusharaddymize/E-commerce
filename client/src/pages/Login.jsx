import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-10
      "
      style={{
        backgroundColor:
          "var(--background-color, #f3f4f6)",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;