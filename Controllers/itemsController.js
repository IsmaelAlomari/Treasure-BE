const { Item } = require("../db/models");

exports.fetchItem = async (itemId, next) => {
  try {
    const item = await item.findByPk(itemId);
    return item;
  } catch (error) {
    next(error);
  }
};

exports.trashList = async (req, res) => {
  try {
    const listItem = await Item.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { isTreasure: false },
    });
    res.json(listItem);
  } catch (error) {
    res.status(500).json({ message: error.message || "Servor Error" });
  }
};

exports.treasureList = async (req, res) => {
  try {
    const listItem = await Item.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { isTreasure: true },
    });
    res.json(listItem);
  } catch (error) {
    res.status(500).json({ message: error.message || "Servor Error" });
  }
};
