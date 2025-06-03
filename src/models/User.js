class User {
  constructor(data = {}) {
    this.uid = data.uid || '';
    this.email = data.email || '';
    this.displayName = data.displayName || '';
    this.role = data.role || 'user';
    this.createdAt = data.createdAt || new Date();
    this.lastLoginAt = data.lastLoginAt || new Date();
  }

  toFirestore() {
    return {
      email: this.email,
      displayName: this.displayName,
      role: this.role,
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt
    };
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new User({
      uid: doc.id,
      ...data
    });
  }
}

module.exports = User; 