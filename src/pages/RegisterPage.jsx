import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import logo from "../assets/logo.png"; 
import imagen1 from "../assets/imagen1.png"; 
import { IoLogIn, IoPersonAdd } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';


function RegisterPage() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const { signup, isAuthenticated, errors:registerErrors} = useAuth();
  const [captchaValue, setCaptchaValue] = useState(null)

  const navigate = useNavigate();

  useEffect( ()=>{
    if(isAuthenticated)
      navigate('/productos')
  }, [isAuthenticated, navigate])
       
      const onSubmit = handleSubmit(async (values) =>{
     //  console.log(values);
       signup(values);

      })
      
  
    return (
  <div className="flex items-center justify-center h-screen">
    <div className='bg-green-400 max-w-md p-12 rounded-md '>
      {
        registerErrors.map( (error, i) =>(
          <div className='bg-red-500 p-2 text-white' key={i}>
              {error}
            </div>
        ))
      } 
 <div className="absolute top-0 right-0 md:top-[6rem] md:right-[-2rem] sm:top-[4rem] sm:right-[-2rem] lg:top-[4rem] lg:right-[-3rem] lg:m-2">
  <img 
    src={logo} 
    alt="Logotipo" 
    className="h-48 w-auto lg:h-[25rem] object-contain max-w-full" 
  />
</div>

       <div className="absolute top-20 left-0 lg:left-[-10rem] m-6">
  <img 
    src={imagen1} 
    alt="Imagen grande" 
    className="h-32 w-auto lg:h-[40rem] object-contain max-w-full" 
  />
</div>
      <form onSubmit={ onSubmit } >
        <h1 className='text-3xl font-bold text-center my-2'>Resgistro</h1>
      <label htmlFor="email">Nombre del Usuario  </label>
        <input type="text"
         className='w-full bg-white text-black px-6 py-2 rounded-md my-3'
        placeholder='Username'
        {
         ...register("username", {required: true, minLength: 5})
        } 
        />

      {errors.username?.type==='required'&&(
        <p className='text-red-500'>Nombre de usuario es reuqerido </p>
      )}
      {errors.username?.type==='minLength' &&(
        <p className='text-red-500'>La longuitud mininma es de 5 caracteres </p>
      )}
       <label htmlFor="email">Email </label>
        <input type="email" 
        className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
        placeholder='Email'
       { 
        ...register("email", {required:true,
                               pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                               message: 'Por favor introduce un email válido',
                               },
        })
       }
        />
        {errors.email?.type==='required' &&(
        <p className='text-red-500'> Email es reuqerido </p>
      )}
        {errors.email?.message &&(
        <p className='text-red-500'>Email no valido </p>
      )}
       <label htmlFor="email">Rol del Usuario </label>
        <input type="rol" 
         className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
        placeholder='Rol'
        {
          ...register("userrol", {required: true})
        }
        />
        {errors.userrol?.type==='required' &&(
        <p className='text-red-500'>Rol del usuario es reuqerido </p>
      )}
       <label htmlFor="email">Password </label>
        <input type="password"
         className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
        placeholder='Password'
        {
        ...register("password", {required: true})
        }
        />
        
      {errors.password?.type==='required' &&(
        <p className='text-red-500'>Password es reuqerido </p>
      )}
      {errors.password?.type==='minLength' &&(
        <p className='text-red-500'>La longuitud mininma es de 6 caracteres </p>
      )}
      <br>
      </br>
      
      <button className="bg-black hover:bg-gray-700  text-white font-bold px-3 py-3 my-3
               rounded-lg justify-center"
               
               type="submit"
               disabled={!captchaValue}

               
               
               ><IoPersonAdd size={30}/>
              </button>
             < ReCaptcha 
          sitekey="6LfFRo4qAAAAAKxtEXJhPpBNev7q_8TycAasdEOS"
          onChange={ (value)=> setCaptchaValue(value)}
        
        />

        
      </form>
      <div className="flex gap-x2 justify-between pt-5 mt-5">
        No tienes una cuenta?
        
        <Link  to='/login' className='text-black '>
        <div className="flex mx-2 px-2 items-start ">
          INICIAR SESION <IoLogIn size={30} className="mx-1"/>

        </div>
       
        
        
       </Link>
      </div> 
    </div>
    </div>
  )
}

export default RegisterPage
