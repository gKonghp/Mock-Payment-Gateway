/**
 * Created by gordonkong on 28/8/2018.
 */



module.exports = function (sequelize, DataTypes) {
    //Define the PaymentB schema
    var PaymentB = sequelize.define('PaymentB', {
        referenceCode: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        classMethods: {
            findOneByReferenceCode: function (referenceCode, callback) {
                return this.findOne({where: {referenceCode: referenceCode}})
                    .then(function (payment) {
                        callback(payment);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        },
        instanceMethods: {
        },
    });
    PaymentB.sync();
    return PaymentB;
}
