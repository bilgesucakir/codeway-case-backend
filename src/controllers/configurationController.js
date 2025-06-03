const ConfigurationService = require('../services/configurationService');
const configurationService = new ConfigurationService(); 
const { ConfigurationResponseDTO } = require('../dtos/ConfigurationDTO');

const createConfiguration = async (req, res) => {
  try {
    const configuration = await configurationService.createConfiguration(req.body, req.user.uid);

    //Add configuration response
    res.status(201).json(new ConfigurationResponseDTO(configuration));
  } catch (error) {
    console.error('Error creating configuration:', error);
    res.status(500).json({ message: 'Error creating configuration' });
  }
};

const getConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    const configuration = await configurationService.getConfiguration(id);

    //Get a configuration response
    res.json(new ConfigurationResponseDTO(configuration));
  } catch (error) {
    console.error('Error getting configuration:', error);
    if (error.message === 'Configuration not found') {

      //If the given configuation is not found in DB
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error getting configuration' });
  }
};

const updateConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    const configuration = await configurationService.updateConfiguration(id, req.body);

    //Update a configuration response
    res.json(new ConfigurationResponseDTO(configuration));
  } catch (error) {
    console.error('Error updating configuration:', error);
    if (error.message === 'Configuration not found') {

      //If the given configuation is not found in DB
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error updating configuration' });
  }
};

const deleteConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    await configurationService.deleteConfiguration(id);

    //Delete a configuration response
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting configuration:', error);
    if (error.message === 'Configuration not found') {

      //If the given configuation is not found in DB
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error deleting configuration' });
  }
};

const getAllConfigurations = async (req, res) => {
  try {
    const configurations = await configurationService.getAllConfigurations();

    //Get all configuarions response
    res.json(configurations.map(config => new ConfigurationResponseDTO(config)));
  } catch (error) {
    console.error('Error getting configurations:', error);
    res.status(500).json({ message: 'Error getting configurations' });
  }
};

module.exports = {
  createConfiguration,
  getConfiguration,
  updateConfiguration,
  deleteConfiguration,
  getAllConfigurations
}; 