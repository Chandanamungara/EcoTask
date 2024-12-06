
import './App.css';

import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductPicker from './ProductPicker';
import Header from './Header'; // Import the updated Header component



const App = () => {

<Header/>


  const [openPicker, setOpenPicker] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenPicker(true);
  };

  const handleSelectProducts = (product) => {
    // Replace the selected product in the list
    // This is just an example, you'd have to update your product list in your actual code
    console.log('Selected product:', product);
  };

  return (
    <div>
      <ProductList onEditProduct={handleEditProduct} />
      <ProductPicker
        open={openPicker}
        onClose={() => setOpenPicker(false)}
        onSelectProducts={handleSelectProducts}
      />
    </div>
  );
};

export default App;

