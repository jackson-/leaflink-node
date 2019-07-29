module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      total: DataTypes.FLOAT,
    },
    {
      freezeTableName: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Company, {as: 'buyer', foreignKey: 'buyerId'});
    Order.belongsTo(models.Company, {as: 'seller', foreignKey: 'sellerId'});
    Order.belongsToMany(models.Product, {
      through: {
        model: models.OrderProduct,
      },
      foreignKey: 'order_id',
      as:'products'
    });
  };

  return Order;
}