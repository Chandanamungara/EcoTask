// ProductPicker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const ProductPicker = ({ open, onClose, onSelectProducts }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.example.com/products?page=${page}&search=${search}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSelectProduct = (product) => {
    onSelectProducts(product);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product Picker</DialogTitle>
      <DialogContent>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <span>{product.name}</span>
                  <Button onClick={() => handleSelectProduct(product)}>Select</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button onClick={() => setPage(page + 1)} disabled={loading}>
          Load More
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPicker;
