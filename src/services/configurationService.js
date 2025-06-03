const { db } = require('../config/firebase');
const Configuration = require('../models/Configuration');
const { CreateConfigurationDTO, UpdateConfigurationDTO } = require('../dtos/ConfigurationDTO');

class ConfigurationService {
  constructor() {
    this.configurationsCollection = db.collection('configurations');
  }

  //Create a new configuration
  async createConfiguration(data, userId) {
    try {
      const createDTO = new CreateConfigurationDTO(data);
      const configuration = new Configuration({
        ...createDTO,
        createdBy: userId,
        createdAt: new Date(),
        lastUpdated: new Date(),
      });

      const docRef = await this.configurationsCollection.add(configuration.toFirestore());
      const doc = await docRef.get();
      return Configuration.fromFirestore(doc);
    } catch (error) {
      throw new Error(`Failed to create configuration: ${error.message}`);
    }
  }

  //Get a configuration by ID
  async getConfiguration(id) {
    try {
      const doc = await this.configurationsCollection.doc(id).get();
      if (!doc.exists) {
        throw new Error('Configuration not found');
      }
      return Configuration.fromFirestore(doc);
    } catch (error) {
      throw new Error(`Failed to get configuration: ${error.message}`);
    }
  }

  //Update a configuration by ID
  async updateConfiguration(id, data) {
    try {
      const updateDTO = new UpdateConfigurationDTO(data);

      const docRef = this.configurationsCollection.doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new Error('Configuration not found');
      }

      const currentConfig = Configuration.fromFirestore(doc);

      //Check for conflict, lastUpdated timestamps must match
      if (!updateDTO.lastUpdated || currentConfig.lastUpdated.toMillis() !== new Date(updateDTO.lastUpdated).getTime()) {
        throw new Error('Conflict detected: configuration has been modified by another user');
      }

      //Prepare updated data
      const updatedConfig = new Configuration({
        ...currentConfig, //Keep existing fields
        ...updateDTO,
        lastUpdated: new Date(), //Update lastUpdated to now
      });

      console.log(updatedConfig.lastUpdated);

      await docRef.update(updatedConfig.toFirestore());

      const updatedDoc = await docRef.get();
      return Configuration.fromFirestore(updatedDoc);

    } catch (error) {
      throw new Error(`Failed to update configuration: ${error.message}`);
    }
  }

  //Delete a configuration by ID
  async deleteConfiguration(id) {
    try {
      await this.configurationsCollection.doc(id).delete();
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete configuration: ${error.message}`);
    }
  }

  //Get all configurations
  async getAllConfigurations() {
    try {
      const snapshot = await this.configurationsCollection.get();
      return snapshot.docs.map(doc => Configuration.fromFirestore(doc));
    } catch (error) {
      throw new Error(`Failed to get configurations: ${error.message}`);
    }
  }
}

module.exports = ConfigurationService; 