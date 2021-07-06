module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
    },
    isTreasure: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Item;
};
