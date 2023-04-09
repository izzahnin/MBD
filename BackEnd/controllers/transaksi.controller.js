const db = require("../models/bundle.model.js");

exports.getAllTransaksi = (req, res) => {
  db.transaksi
    .findAll({
      attributes: ["id", "trs_number", "createdAt"],
      include: [
        {
          model: db.transaksi_detail,
          attributes: ["id", "qty"],
          include: [
            {
              model: db.produk,
              attributes: ["id", "title", "image", "price", "url"],
              include: [
                {
                  model: db.kategori,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    })
    .then(async (result) => {
      if (result.length > 0) {
        const dataTransaksi = await result.map((item, index) => {
          const detailItem = item.transaksi_details.map((_item, _index) => {
            return {
              id: _item.id,
              produk_id: _item.produk_id,
              title: _item.produk.title,
              image: _item.produk.image,
              price: _item.produk.price,
              url: _item.produk.url,
              qty: _item.qty,
              kategori: _item.produk.kategori.name,
            };
          });
          return {
            id: item.id,
            trs_number: item.trs_number,
            createdAt: item.createdAt,
            details: detailItem,
          };
        });
        res.send({
          code: 200,
          message: "OK",
          data: dataTransaksi,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Belum ada data transaksi",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error > " + err,
      });
    });
};

exports.getOneTransaksi = async (req, res) => {
  const id = req.params.id;

  db.transaksi.findOne({
    where: {
      id: id,
    },
    attributes: ["id", "trs_number", "createdAt"],
    include: [
      {
        model: db.transaksi_detail,
        attributes: ["id", "qty"],
        include: [
          {
            model: db.produk,
            attributes: ["id", "title", "image", "price", "url"],
            include: [
              {
                model: db.kategori,
                attributes: ["name"],
              }
            ]
          }
        ]
      }
    ]
  }).then(async result => {
    if (result.length !== null){
      const detailItem = result.transaksi_details.map((_item, _index) => {
        return {
          id: _item.id,
          produk_id: _item.produk_id,
          title: _item.produk.title,
          image: _item.produk.image,
          price: _item.produk.price,
          url: _item.produk.url,
          qty: _item.qty,
          kategori: _item.produk.kategori.name,
        };
      });

      res.send({
        code: 200,
        message: "OK",
        data: {
          id: result.id,
          trs_number: result.trs_number,
          createdAt: result.createdAt,
          details: detailItem,
        }
      })
    } else {
      res.status(404).send({
        code: 404,
        message: "Data transaksi tidak ditemukan"
      })
    }

  }).catch(err => {
    res.status(500).send({
      code: 500,
      message: "Error > " + err
    })
  })
};