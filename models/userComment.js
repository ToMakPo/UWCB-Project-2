module.exports = function (sequelize, DataTypes) {
    const userComment = sequelize.define("user_comment", {
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
    //     bookList.belongsTo(models.user_profile, {
    //         onDelete: "restrict",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });

    //     //self join
    //     userComment.hasMany(models.user_comment, {
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
