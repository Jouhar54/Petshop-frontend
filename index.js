import express from 'express';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { v4 as uid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8002;

app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, 'product.json');
const usersFilePath = path.join(__dirname, 'users.json');

// Endpoint to add a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = uid();

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let products = JSON.parse(data);
    products.products.push(newProduct);

    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to write file' });
      }

      res.status(200).json({ message: 'Product added successfully' });
    });
  });
});

// Endpoint to get all products
app.get('/products', (req, res) => {
  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let products = JSON.parse(data);
    res.status(200).json(products.products);
  });
});

// Endpoint to update a product by id
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let products = JSON.parse(data);
    const productIndex = products.products.findIndex(product => product.id === id);

    if (productIndex > -1) {
      products.products[productIndex] = { ...products.products[productIndex], ...updatedProduct };

      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to write file' });
        }
        res.status(200).json(products.products[productIndex]); // Return updated product
      });
    } else {
      res.status(404).json({ message: 'Product not found' }); // Not Found
    }
  });
});

// Endpoint to delete a product by id
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let products = JSON.parse(data);
    const productIndex = products.products.findIndex(product => product.id === id);

    if (productIndex > -1) {
      products.products.splice(productIndex, 1);

      fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to write file' });
        }
        res.status(204).send(); // No Content
      });
    } else {
      res.status(404).json({ message: 'Product not found' }); // Not Found
    }
  });
});

// Endpoint to add a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = uuidv4();

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let users = JSON.parse(data);
    users.users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to write file' });
      }

      res.status(200).json({ message: 'User added successfully' });
    });
  });
});

// Endpoint to get all users
app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let users = JSON.parse(data);
    res.status(200).json(users.users);
  });
});

// Endpoint to delete a user by email
app.delete('/users/:email', (req, res) => {
  const email = req.params.email;

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read file' });
    }

    let users = JSON.parse(data);
    const userIndex = users.users.findIndex(user => user.email === email);

    if (userIndex > -1) {
      users.users.splice(userIndex, 1);

      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to write file' });
        }
        res.status(204).send(); // No Content
      });
    } else {
      res.status(404).json({ message: 'User not found' }); // Not Found
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});