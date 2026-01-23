import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Offers from "./pages/Offers"
import Destinations from "./pages/Destinations"

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
    
  )
}

export default App
