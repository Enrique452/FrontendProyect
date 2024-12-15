import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson, IoLogoUsd , IoBagAddSharp } from "react-icons/io5";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-green-600 my-3 flex flex-wrap justify-between items-center py-3 px-6 md:py-5 md:px-10 rounded-lg relative z-50">
            <Link to={isAuthenticated ? "/productos" : "/"} className="text-white">
                <h1 className="text-xl md:text-2xl font-bold">TIENDA FOOTPOSS</h1>
            </Link>
            <ul className="flex gap-x-5 sm:gap-x-3 flex-wrap justify-end items-center">
                {isAuthenticated ? (
                    <>
                        <li className="flex items-center text-white font-bold gap-x-4">
                            <IoPerson className="text-xl md:text-2xl" /> 
                            <span className="text-sm md:text-base">{user?.username}</span>
                        </li>
                        <li>
                            <Link
                                to="/add-productos"
                                className="bg-green-500 rounded-lg flex items-center justify-center p-2 md:p-3 text-white hover:bg-green-700 transition text-sm md:text-base"
                            >
                                <IoAddCircle className="text-xl md:text-2xl" />
                                <span className="ml-2 hidden sm:inline">AGREGAR</span>
                            </Link>
                        </li>

                        <li>
                            
                            <Link
                                to="/ventas"
                                className="bg-green-500 rounded-lg flex items-center justify-center p-2 md:p-3 text-white hover:bg-green-700 transition text-sm md:text-base"
                            >
                                <IoLogoUsd className="text-xl md:text-2xl" />
                                <span className="ml-2 hidden sm:inline">LISTADO</span>
                            </Link>
                        </li>
                        <li>

                            <Link
                                to="/add-ventas"
                                className="bg-green-500 rounded-lg flex items-center justify-center p-2 md:p-3 text-white hover:bg-green-700 transition text-sm md:text-base"
                            >
                                < IoBagAddSharp
                                   className="text-xl md:text-2xl" />
                                <span className="ml-2 hidden sm:inline">GENERAR VENTA</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="bg-green-500 rounded-lg flex items-center justify-center p-2 md:p-3 text-white hover:bg-green-700 transition text-sm md:text-base"
                            >
                                <IoLogOut className="text-xl md:text-2xl" />
                                <span className="ml-2 hidden sm:inline">SALIR</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="bg-green-500 rounded-lg flex items-center justify-center p-2 md:p-3 text-white hover:bg-green-700 transition text-sm md:text-base"
                            >
                                <IoLogIn className="text-xl md:text-2xl" />
                                <span className="ml-2 hidden sm:inline">LOGIN</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="bg-green-500 rounded-lg flex items-center justify-center p-2 md:p-3 text-white hover:bg-green-700 transition text-sm md:text-base"
                            >
                                <IoPersonAdd className="text-xl md:text-2xl" />
                                <span className="ml-2 hidden sm:inline">REGISTRAR</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;

