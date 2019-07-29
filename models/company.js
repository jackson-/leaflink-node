module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      company_type: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  Company.associate = (models) => {
    Company.hasMany(models.Product, {as:'products', foreignKey: 'companyId'});
  };

  return Company;
}