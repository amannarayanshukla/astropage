import Modal from 'react-modal';
import Home from './pages/Home';
// import Products from './pages/Products';
// import Product from './pages/Product';

Modal.setAppElement('#root');

const App = () => {
  return (
    <>
      <Home />
      {/* <Products /> */}
      {/* <Product /> */}
    </>
  );
};

export default App;
