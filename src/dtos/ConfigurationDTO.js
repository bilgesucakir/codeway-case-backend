class CreateConfigurationDTO {
  constructor(data) {
    this.parameterKey = data.parameterKey;
    this.value = data.value;
    this.description = data.description;
    this.createdAt = data.createdAt || null;
    this.lastUpdated = data.lastUpdated || null;
  }
}

class UpdateConfigurationDTO {
  constructor(data) {
    this.parameterKey = data.parameterKey;
    this.value = data.value;
    this.description = data.description;
    this.createdAt = data.createdAt || null;
    this.lastUpdated = data.lastUpdated || null;
  }
}

class ConfigurationResponseDTO {
  constructor(configuration) {
    this.id = configuration.id;
    this.parameterKey = configuration.parameterKey;
    this.value = configuration.value;
    this.description = configuration.description;
    this.createdAt = configuration.createdAt;
    this.lastUpdated = configuration.lastUpdated;
  }
}

module.exports = {
  CreateConfigurationDTO,
  UpdateConfigurationDTO,
  ConfigurationResponseDTO
}; 