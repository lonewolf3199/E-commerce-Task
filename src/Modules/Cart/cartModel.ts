import { Sequelize } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
    return sequelize.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        userId: {
            type: DataTypes.INTEGER,
            refrences: {
                model: 'users',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            refrences: {
                model: 'product',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    },{
        timestamps: true,

    })
}