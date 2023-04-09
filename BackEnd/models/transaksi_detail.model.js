module.exports = (sequelize, Sequelize) => {
  const Transaksi_detail = sequelize.define("transaksi_detail", {

    qty: {
      type: Sequelize.INTEGER,
    },
  });

  return Transaksi_detail;
};