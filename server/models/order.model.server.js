module.exports = function (sequelize, DataTypes) {
    //Define the Order schema
    console.log(DataTypes)
    var Order = sequelize.define('Order', {
        referenceCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
        custName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        custPhone: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(30,2),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        classMethods: {

        },
        instanceMethods: {

        },
    });
    Order.sync();
    return Order;
}
