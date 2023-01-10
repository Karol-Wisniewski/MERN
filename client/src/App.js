import './Style/AppStyle.scss';
import Home from './Components/Home';
import { Routes, Route } from 'react-router'
import AddProduct from "./Components/AddProduct"
import EditProduct from './Components/EditProduct';
import Report from "./Components/Report"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/:id/edit' element={<EditProduct />} />
        <Route path='/:id/report' element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
