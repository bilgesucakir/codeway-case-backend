const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const { signIn, signUp, resetPassword, updatePassword, signOut } = require('../controllers/authController');
const {
  createConfiguration,
  getConfiguration,
  updateConfiguration,
  deleteConfiguration,
  getAllConfigurations
} = require('../controllers/configurationController');

//Public route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the REST API' });
});

//Auth routes
router.post('/auth/signin', signIn); //User sign in
router.post('/auth/signup', signUp); //User sign up
router.post('/auth/reset-password', resetPassword); //User password reset
router.post('/auth/update-password', authenticateUser, updatePassword); //User password update
router.post('/auth/signout', authenticateUser, signOut); //User sign out

//Protected routes
router.post('/api/configurations', authenticateUser, createConfiguration); //Add configuration
router.get('/api/configurations/:id', authenticateUser, getConfiguration); //Get a configuration
router.get('/api/configurations', authenticateUser, getAllConfigurations); //Get all configurations
router.put('/api/configurations/:id', authenticateUser, updateConfiguration); //Update a configuration
router.delete('/api/configurations/:id', authenticateUser, deleteConfiguration); //Delete a configuration

module.exports = router;