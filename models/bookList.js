module.exports = function (sequelize, DataTypes) {
    const bookList = sequelize.define("book_list", {
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

    // bookList.associate = function (models) {
    //     bookList.belongsTo(models.user_profile, {
    //         onDelete: "restrict",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return bookList;
};
