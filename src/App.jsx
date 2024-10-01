import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Components/core/AppRoutes";
import { Header } from "./Components/core/Header";

function App() {

  return (
    
    <BrowserRouter >
    <Header />
    <AppRoutes />
    </BrowserRouter>
     
  );
}

export default App;