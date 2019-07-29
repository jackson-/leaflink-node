module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.FLOAT,
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );

  OrderProduct.associate = (models) => {
  };

  return OrderProduct;
}