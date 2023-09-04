import { Sequelize } from "sequelize";

module.exports = (Sequelize: any, DataTypes: any) => {
    return Sequelize.define('product', {
        id:{
            type :DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        name_product: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.INTEGER
        },
        stock: {
            type: DataTypes.INTEGER
        },
        thumb_image: {
            type: DataTypes.STRING
        },
        Images: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        status: {
            type: DataTypes.STRING
        },
    }, {timestamps : true}
    )
}