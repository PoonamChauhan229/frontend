import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import CartContextProvider from "./context/cartContext.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <CartContextProvider>
      <App />
    </CartContextProvider>
    </ShopContextProvider>
  </BrowserRouter>,
)
