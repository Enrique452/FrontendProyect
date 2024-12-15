import logo from "../assets/logo.png"; 
import imagen1 from "../assets/imagen1.png"; 

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">

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
      <div className="bg-green-600 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3x2 font-bold my-3 text-center">Sistema de Venta </h1>
        <h2 className="text-1x1 font-bold my-3 texte-center">Lenguajes Web
        </h2>
        <div>
          <p className="gap-x-2 text-justify pt-5 mt-5 text-sm">
            Estes sistema ha sido creado para la registro de ventas y producto para dar un mayor 
            rapides y tener un control mas organizado de los porductos 


          </p>
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r
          from-trasparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>

          <p className="texte-center text-xs">
            Derechos Reservados EAGG &#9400; 2024
          </p>
        </div>
        
      </div>
      
    </div>
  )
}

export default HomePage
