import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
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
      <RegisterForm />
    </div>
  );
};

export default Register;