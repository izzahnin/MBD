const db = require("../models/bundle.model.js");
const func = require("../libs/function.js");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res) => {
  const data = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    full_description: req.body.full_description,
    price: req.body.price,
    image: req.file.filename,
    category_id: req.body.category_id,
    url: func.convertToSlug(req.body.title + "-" + Math.random(1000))
  };

  db.produk
    .create(data)
    .then((result) => {
      res.send({
        code: 200,
        message: "Berhasil menyimpan data",
        data: result,
      });
    })
    .catch((err) => {
      
    });
};

exports.findAll = async (req, res) => {
  db.produk
    .findAll()
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "Berhasil mendapatkan data",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Data tidak ditemukan",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal mendapatkan data",
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  db.produk
    .findOne({
      where: {
        id: id,
      },
    })
    .then((result) => {
      res.status(200).send({
        code: 200,
        message: "OK Find One",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error Find One",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = {
    title: req.body.title,
    description: req.body.description,
    full_description: req.body.full_description,
    price: req.body.price,
    category_id: req.body.category_id,
    url: func.convertToSlug(req.body.title + "-" + Math.random(1000)),
  };

  console.log("ERR >>", req.file);
  if (req.file != undefined) {
    data["image"] = req.file.filename;
  }

  db.produk
    .update(data, {
      where: {
        id: id
      },
    })
    .then((result) => {
      res.status(200).send({
        code: 200,
        message: "OK Update",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error Update",
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  db.produk
    .destroy({
      where: {
        id: id
      },
    })
    .then((result) => {
      res.status(200).send({
        code: 200,
        message: "OK Delete",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error Delete",
      });
    });
};