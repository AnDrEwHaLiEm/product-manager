import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PurchaseProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await window.api.getProducts();
            setProducts(result);
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if quantity is a positive number
        if (!Number.isInteger(+quantity) || +quantity <= 0) {
            alert('الكمية مطلوبة ويجب ان تكون اكبر من 0 ❌');
            return;
        }
        try {
            await window.api.updateProductQuantity(selectedProduct, parseInt(quantity, 10));
            setSelectedProduct('');
            setQuantity('');
            alert("تمت إضافة الكمية بنجاح ✅");
        } catch (error) {
            console.error('Failed to purchase product:', error);
            alert('لم تتم إضافة الكمية ❌');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
                <InputLabel>اختر المنتج</InputLabel>
                <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                >
                    {products.map(product => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="الكمية"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                شراء المنتج
            </Button>
        </Box>
    );
};

export default PurchaseProduct;
