const db = require("../models/bundle.model.js");

exports.create = async (req, res) => {
  const data = {
    name: req.body.name
  };

  db.kategori
    .create(data)
    .then((result) => {
      res.send({
        code: 200,
        message: "Berhasil menyimpan data",
        data: result
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "Gagal menyimpan data"
      });
    });
};

exports.findAll = async (req, res) => {
  db.kategori
    .findAll()
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "Berhasil mendapatkan data",
          data: result
        });
      } else {
        res.send({
          code: 404,
          message: "Data tidak ditemukan"
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal mendapatkan data"
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  db.kategori
    .findOne({
      where: {
        id: id
      }
    })
    .then((result) => {
      res.send({
        code: 200,
        message: "Berhasil mendapatkan data",
        data: result
      });
    }).catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal mendapatkan data"
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const data = {
    name: req.body.name
  }

  db.kategori.update(data, {
    where: {id: id}
  }).then((result) => {
    if (result[0]){
      res.send({
        code: 200,
        message: "Berhasil mengubah data"
      });
    } else {
      res.status(422).send({
        code: 422,
        message: "Gagal mengubah data, field error"
      });
    }
  }).catch((err) => {
    res.status(500).send({
      code: 500,
      message: "Gagal mengubah data"
    });
  });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  db.kategori.destroy({
    where: {id: id}
  }).then((result) => {
    if (result){
      res.send({
        code: 200,
        message: "Berhasil menghapus data"
      });
    } else {
      res.status(422).send({
        code: 422,
        message: "Gagal menghapus data, field error"
      });
    }
  }).catch((err) => {
    res.status(500).send({
      code: 500,
      message: "Gagal menghapus data"
    });
  });
};