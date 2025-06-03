const authService = require('../services/authService');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.signIn(email, password);
    
    //Sign in response
    res.status(200).json({
      message: 'Sign in successful',
      user,
      token
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const { user, token } = await authService.signUp(email, password, displayName);
    
    //Sign up response
    res.status(201).json({
      message: 'User created successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(400).json({ message: 'User creation failed' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.resetPassword(email);
    
    //Reset password response
    res.status(200).json({
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(400).json({ message: 'Password reset failed' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    await authService.updatePassword(req.user.uid, newPassword);
    
    //Update password response
    res.status(200).json({
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(400).json({ message: 'Password update failed' });
  }
};

const signOut = async (req, res) => {
  try {
    await authService.signOut(req.user.uid);
    
    //Sign out response
    res.status(200).json({
      message: 'Sign out successful'
    });
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(400).json({ message: 'Sign out failed' });
  }
};

module.exports = {
  signIn,
  signUp,
  resetPassword,
  updatePassword,
  signOut
}; 