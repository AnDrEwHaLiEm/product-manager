const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getProducts: () => ipcRenderer.invoke('get-products'),
    createProduct: (name, quantity) => ipcRenderer.invoke('create-product', name, quantity),
    updateProductQuantity: (id, quantity) => ipcRenderer.invoke('update-product-quantity', id, quantity),
});
