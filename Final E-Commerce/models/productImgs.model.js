const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const ProductImgs = db.define('productImgs', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	imgUrl: {
		primaryKey: true,
		type: DataTypes.STRING,
		autoIncrement: false,
		allowNull: false,
	},
	productId: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { ProductImgs };