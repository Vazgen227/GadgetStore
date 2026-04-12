import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Header } from './components/Header'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
     </Routes>    
    </div>
    
  )
}

export default App