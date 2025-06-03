class Configuration {
  constructor(data = {}) {
    this.id = data.id || '';
    this.parameterKey = data.parameterKey || '';
    this.value = data.value || '';
    this.description = data.description || '';
    this.createdAt = data.createdAt || new Date();
    this.lastUpdated = data.lastUpdated || new Date();
  }

  toFirestore() {
    return {
      parameterKey: this.parameterKey,
      value: this.value,
      description: this.description,
      createdAt: this.createdAt,
      lastUpdated: this.lastUpdated
    };
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new Configuration({
      id: doc.id,
      parameterKey: data.parameterKey,
      value: data.value,
      description: data.description,
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated
    });
  }
}

module.exports = Configuration; 