import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollRestoration de react-router exige Data Router (RouterProvider). Con BrowserRouter
 * rompe en producción. Subir scroll al cambiar ruta equivale en la práctica.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
