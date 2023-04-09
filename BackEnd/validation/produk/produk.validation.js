const Schema = require("./produk.schema.js");

module.exports = {
  createProduk: async (req, res, next) => {
    const { error, value } = Schema.create.validate(req.body);
    if (error) {
      res.status(422).send({
        code: 422,
        success: false,
        message: error.message,
      });
    } else {
      next();
    }
  },
};
