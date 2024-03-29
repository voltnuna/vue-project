module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });

  User.associate = (db) => {
   db.User.hasMany(db.Post);
   db.User.hasMany(db.Plan);
   db.User.hasMany(db.Mood);
   db.User.hasMany(db.Todo);
  };
  return User;
};