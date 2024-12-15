import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import imagen1 from "../assets/imagen1.png";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)
      navigate('/productos');
    else
      console.log('No esta autenticado');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute top-0 right-0 md:top-[6rem] md:right-[-2rem] sm:top-[4rem] sm:right-[-2rem] lg:top-[4rem] lg:right-[-3rem] lg:m-2">
        <img
          src={logo}
          alt="Logotipo"
          className="h-48 w-auto lg:h-[25rem] object-contain max-w-full"
        />
      </div>

      {/* Imagen izquierda */}
      <div className="absolute top-20 left-0 lg:left-[-10rem] m-6">
        <img
          src={imagen1}
          alt="Imagen grande"
          className="h-32 w-auto lg:h-[40rem] object-contain max-w-full"
        />
      </div>

      <div className="bg-green-400 max-w-md p-10 rounded-2xl">
        <h1 className="text-2xl font-bold mb-10 text-center">LOGIN</h1>

        {loginErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-4"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500">Email es requerido</p>
          )}

          <label htmlFor="password">Password </label>
          <div className="flex items-center relative">
            <input
              type={passwordShown ? "text" : "password"}
              className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2 pr-12"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <div className="absolute right-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {passwordShown ? (
                <IoEyeSharp size={30} />
              ) : (
                <IoEyeOffSharp size={30} />
              )}
            </div>

            {errors.password?.type === 'required' && (
              <p className="text-red-500">Password requerido</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
            )}
          </div>

          <button
            className="bg-black hover:bg-gray-700 text-white font-bold px-3 py-3 my-3 rounded-lg justify-center"
            type="submit"
            disabled={!captchaValue}
          >
            <IoLogIn size={30} />
          </button>

          <ReCaptcha
            sitekey="6LfFRo4qAAAAAKxtEXJhPpBNev7q_8TycAasdEOS"
            onChange={(value) => setCaptchaValue(value)}
          />
        </form>

        <div className="flex gap-x2 justify-between pt-5 mt-5">
          No tienes una cuenta?
          <Link to='/register' className='text-black'>
            <div className="flex mx-2 px-2 items-start">
              ¡Crea una <IoPersonAdd size={30} className="mx-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
