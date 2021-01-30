module.exports = function(sequelize, DataTypes) {
  const bookList = sequelize.define("bookList", {
    // eslint-disable-next-line camelcase
    google_book_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    ranking: {
      type: DataTypes.INTEGER,
      default: null
    }
  });

  bookList.associate = function(models) {
    bookList.belongsTo(models.userProfile, {
      onDelete: "restrict",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return bookList;
};
