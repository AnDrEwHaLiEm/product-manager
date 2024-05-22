import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CreateProduct = ({ onCreateProduct }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if name is empty or already exists
        if (!name) {
            alert('اسم المنتج يجب مطلوب ويجب ان يكون مميز ❌');
            return;
        }
        if (!Number.isInteger(+quantity) || +quantity <= 0) {
            alert('الكمية مطلوبة ويجب ان تكون اكبر من 0 ❌');
            return;
        }
        try {
            await window.api.createProduct(name, parseInt(quantity, 10));
            setName('');
            setQuantity('');
            alert("تمت اضافة المنتج بنجاح ✅")
        } catch (error) {
            console.error('Failed to create product:', error);
            alert('لم تتم اضافة المنتج ❌');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Create Product
            </Button>
        </Box>
    );
};

export default CreateProduct;
