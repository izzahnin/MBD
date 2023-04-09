const db = require("../models/bundle.model.js");
const func = require("../libs/function.js");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");

exports.getProdukHome = async (req, res) => {
  db.produk
    .findAll({
      attributes: ["id", "title", "image", "price", "url"],
      limit: 8,
    })
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
          message: `Tidak ada data yang cocok pada keyword '${keyword}'`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find data > " + err,
      });
    });
};

exports.getProdukPage = async (req, res) => {
  let keyword = "";
  const condition = [];
  if (req.query.keyword) {
    keyword = req.query.keyword;
    condition.push({
      title: {
        [Op.like]: `%${keyword}%`,
      },
    });
  }

  db.produk
    .findAll({
      where: condition,
      attributes: ["id", "title", "image", "price", "url"],
    })
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
          message: `Tidak ada data yang cocok pada keyword '${keyword}'`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find data > " + err,
      });
    });
};

exports.getProdukDetail = async (req, res) => {
  const url = req.params.url;

  db.produk
    .findOne({
      where: {
        url: url,
      },
      attributes: [
        "id",
        "title",
        "description",
        "full_description",
        "image",
        "price",
        "url",
        "createdAt",
      ],
      include: [
        {
          model: db.kategori,
          attributes: ["name"],
        },
      ],
    })
    .then((result) => {
      if (result) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Produk telah dihapus atau tidak ditemukan!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find data > " + err,
      });
    });
};

exports.getDataKeranjang = async (req, res) => {
  const session_id = req.query.session_id;

  db.keranjang
    .findAll({
      where: {
        session_id: session_id,
      },
      attributes: ["id", "qty", "session_id", "createdAt"],
      include: [
        {
          model: db.produk,
          attributes: ["id", "title", "image", "price", "url"],
        },
      ],
    })
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Keranjang kosong!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find data > " + err,
      });
    });
};

exports.tambahDataKeranjang = async (req, res) => {
  const cekKeranjang = await db.keranjang.findOne({
    where: {
      produk_id: req.body.produk_id,
      session_id: req.body.session_id,
    },
  });

  if (cekKeranjang !== null) {
    const data = {
      qty: cekKeranjang.qty + 1,
    };

    await db.keranjang
      .update(data, {
        where: {
          id: cekKeranjang.id,
        },
      })
      .then((result) => {
        res.send({
          code: 200,
          message: "Berhasil menambahkan keranjang",
        });
      })
      .catch((err) => {
        res.status(500).send({
          code: 500,
          message: "Error menambahkan keranjang > " + err,
        });
      });
  } else {
    const data = {
      produk_id: req.body.produk_id,
      qty: req.body.qty,
      session_id: req.body.session_id,
    };

    await db.keranjang
      .create(data)
      .then((result) => {
        res.send({
          code: 200,
          message: "Berhasil menambahkan data ke keranjang",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          code: 500,
          message: "Error menambahkan data keranjang > " + err,
        });
      });
  }
};

exports.ubahDataKeranjang = async (req, res) => {
  const id = req.params.id;
  const qty = req.body.qty;

  db.keranjang
    .update(
      {
        qty: qty,
      },
      {
        where: {
          id: id,
        },
      }
    )
    .then((result) => {
      if (result[0]) {
        res.send({
          code: 200,
          message: "Berhasil mengubah data keranjang",
        });
      } else {
        res.status(422).send({
          code: 422,
          message: "Ada yang salah dari inputan anda",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error mengubah data keranjang > " + err,
      });
    });
};

exports.hapusDataKeranjang = async (req, res) => {
  const id = req.params.id;

  db.keranjang
    .destroy({
      where: {
        id: id,
      },
    })
    .then((result) => {
      res.send({
        code: 200,
        message: "Berhasil menghapus data keranjang",
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error menghapus data keranjang > " + err,
      });
    });
};

exports.checkout = async (req, res) => {
  const session_id = req.query.session_id;

  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    alamat: req.body.alamat,
    phone: req.body.phone,
  };

  const dataKeranjang = await db.keranjang.findAll({
    where: {
      session_id: session_id,
    },
  });

  if (dataKeranjang.length > 0) {
    const trs_number = 'TRS-' + Date.now();
    const trs_id = uuidv4();

    const dataTransaksi = {
      id: trs_id,
      trs_number: trs_number,
    };

    await db.transaksi.create(dataTransaksi);

    await dataKeranjang.map((item, index) => {
      const dataTrsDetail = {
        qty: item.qty,
        produk_id: item.produk_id,
        trs_id: trs_id,
      };

      db.transaksi_detail.create(dataTrsDetail);
      db.keranjang.destroy({
        where: {
          id: item.id,
        },
      });
    });

    await db.customer.create(data);

    await res.status(200).send({
      code: 200,
      message: "Sukses melakukan transaksi",
      data: dataTransaksi
    })

  } else {
    res.status(403).send({
      code: 403,
      message: "Kamu belum memiliki produk di keranjang",
    });
  }
};
