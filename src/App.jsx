import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProductosPage from "./pages/ProductosPages";
import ProductosFormPage from "./pages/ProductosFormPage";
import ProtectedRoute from "./ProtectedRoute";
import { ProductosProvider } from "./context/ProductosContext";
import { VentasProvider } from "./context/VentasContext"; // Nuevo contexto
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import VentasFormPage from "./pages/VentasFormPages";
import VentasPage from "./pages/VentasPage";
import { DetalleVentaProvider } from "./context/DetalleVentaContext";

import VentasDetallePage from "./pages/VentasDetallePage"; // Nueva página

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <VentasProvider>
        <DetalleVentaProvider>

          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/productos" element={<ProductosPage />} />
                  <Route path="/add-productos" element={<ProductosFormPage />} />
                  <Route path="/productos/:id" element={<ProductosFormPage />} />
                  <Route path="/add-ventas" element={<VentasFormPage />} />
                  <Route path="/ventas" element={<VentasPage />} />
                  <Route path="/detalleVenta/:id" element={<VentasDetallePage />} /> 

                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
          </DetalleVentaProvider>
        </VentasProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;
