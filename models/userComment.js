module.exports = function(sequelize, DataTypes) {
  const userComment = sequelize.define("userComment", {
    googleBookId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.BLOB
    },
    displayed: {
      type: DataTypes.BOOLEAN,
      default: true
    },
    liked: {
      type: DataTypes.INTEGER,
      default: 0
    },
    disliked: {
      type: DataTypes.INTEGER,
      default: 0
    }
  });

  // userComment.associate = function (models) {
  //     bookList.belongsTo(models.userProfile, {
  //         onDelete: "restrict",
  //         foreignKey: {
  //             allowNull: false
  //         }
  //     });

  //     //self join
  //     userComment.hasMany(models.userComment, {
  //         onDelete: "restrict"
  //     });

  //     userComment.belongsTo(models.userComment, {
  //         onDelete: "restrict",
  //         foreignKey: {
  //             allowNull: false
  //         }
  //     });
  // };

  return userComment;
};
