import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';

const SellProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await window.api.getProducts();
            setProducts(result);
        };
        fetchProducts();
    }, [quantity]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if quantity is a positive number
        if (!Number.isInteger(+quantity) || +quantity <= 0) {
            alert('الكمية مطلوبة ويجب ان تكون اكبر من 0 ❌');
            return;
        }
        const product = products.find(p => p.id === selectedProduct);
        if (quantity > product.quantity) {
            alert('الكمية المطلوبة اكبر من الكمية الموجوده ❌');
            return;
        }
        try {
            await window.api.updateProductQuantity(selectedProduct, -parseInt(quantity, 10));
            setSelectedProduct('');
            setQuantity('');
            alert("تمت عملية البيع بنجاح ✅");
        } catch (error) {
            console.error('Failed to sell product:', error);
            alert('لم تتم عملية البيع ❌');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <Typography variant='h3'>بيع منتج</Typography>
            <FormControl style={{ width: '40%' }} margin="normal">
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
            <br />
            <TextField
                label="الكمية"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '40%' }}
                margin="normal"
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
                بيع المنتج
            </Button>
        </Box>
    );
};

export default SellProduct;
