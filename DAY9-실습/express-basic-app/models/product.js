module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '상품 고유 번호',
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '상품명',
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '상품 가격',
      },
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: false,
      comment: '상품 리스트',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
