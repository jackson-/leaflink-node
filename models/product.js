module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
    },
    {
      freezeTableName: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Company, {as: "company"});
    Product.belongsToMany(models.Order, {
      through: {
        model: models.OrderProduct,
      },
      foreignKey: 'product_id',
    });
  };

  return Product;
}