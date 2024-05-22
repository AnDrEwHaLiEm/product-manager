import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

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
        <Box component="form" onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <Typography variant='h3'> تعريف منتج</Typography>
            <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '40%' }}
                margin="normal"
            />
            <br />
            <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '40%' }}
                margin="normal"
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
                انشاء منتج
            </Button>
        </Box>
    );
};

export default CreateProduct;
