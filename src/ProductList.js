// ProductList.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import productPicker from './ProductPicker'; // Importing the Product Picker Dialog
import { Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Sports Shoes', image: 'shoe.jpg', variants: ['Small - Red', 'Medium - White'] }
    // Example products
  ]);

  // Handle drag and drop reordering
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const reorderedProducts = [...products];
    const [movedProduct] = reorderedProducts.splice(source.index, 1);
    reorderedProducts.splice(destination.index, 0, movedProduct);
    setProducts(reorderedProducts);
  };

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const addProduct = () => {
    setProducts([...products, { id: String(products.length + 1), name: '', image: '', variants: [] }]);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="product-list">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {products.map((product, index) => (
                <Draggable key={product.id} draggableId={product.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <img src={product.image} alt={product.name} width="50" />
                        <span>{product.name}</span>
                        <IconButton onClick={() => removeProduct(product.id)}>
                          <Delete />
                        </IconButton>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={addProduct}>Add Product</Button>
    </div>
  );
};

export default ProductList;
