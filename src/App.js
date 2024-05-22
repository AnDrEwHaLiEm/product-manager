import React from 'react';
import { Box, Button } from '@mui/material';
import CreateProduct from './components/CreateProduct';
import PurchaseProduct from './components/PurchaseProduct';
import SellProduct from './components/SellProduct';
import ViewProducts from './components/ViewProducts';

const App = () => {
  const [activeSection, setActiveSection] = React.useState('create-product');

  const renderSection = () => {
    switch (activeSection) {
      case 'create-product':
        return <CreateProduct />;
      case 'purchase-product':
        return <PurchaseProduct />;
      case 'sell-product':
        return <SellProduct />;
      case 'view-products':
        return <ViewProducts />;
      default:
        return <CreateProduct />;
    }
  };

  return (
    <Box display="flex">
      <Box width="200px" bgcolor="#f4f4f4" p={2}>
        <Button onClick={() => setActiveSection('create-product')} fullWidth variant="contained">
          Create Product
        </Button>
        <Button onClick={() => setActiveSection('purchase-product')} fullWidth variant="contained">
          Purchase Product
        </Button>
        <Button onClick={() => setActiveSection('sell-product')} fullWidth variant="contained">
          Sell Product
        </Button>
        <Button onClick={() => setActiveSection('view-products')} fullWidth variant="contained">
          View Products
        </Button>
      </Box>
      <Box flexGrow={1} p={2}>
        {renderSection()}
      </Box>
    </Box>
  );
};

export default App;
