module.exports = (app, db) => {
  app.get("/orders", (req, res) =>
    db.Order.findAll({include:[
      {model: db.Product, as: 'products'},
       {model: db.Company, as: 'buyer'}, 
       {model: db.Company, as: 'seller'}
    ]}).then(result => res.json(result))
  );
  app.get("/orders/:id", (req, res) =>
    db.Order.findByPk(req.params.id, {include:[
      {model: db.Product, as: 'products'},
       {model: db.Company, as: 'buyer'}, 
       {model: db.Company, as: 'seller'}
    ]}).then(result => res.json(result))
  );
  app.post("/orders", async (req, res) => {
    const product_ids = req.body.products.map((p) => p.id)
    // const products = db.Product.findAll({where: {$in: product_ids}})
    const result = await db.Order.create({buyerId: req.body.buyerId, sellerId: req.body.sellerId})
    await result.setProducts(product_ids)
    return res.json(result)
  }
  );
  
  app.delete("/orders/:id", (req, res) =>
    db.Order
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
