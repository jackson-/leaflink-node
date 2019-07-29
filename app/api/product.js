module.exports = (app, db) => {
  app.get("/products", (req, res) =>
    db.Product.findAll({include: [{model: db.Company, as: 'company'}]}).then(result => res.json(result))
  );
  app.get("/products/:id", (req, res) =>
    db.Product.findByPk(req.params.id, {include: [{model: db.Company, as: 'company'}]}).then(result => res.json(result))
  );
  app.post("/products", async (req, res) => {
    const result = await db.Product
      .create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        companyId: req.body.companyId
      })
    return res.json(result)
  }
  );
  app.put("/products/:id", async (req, res) => {
      const updates = await db.Product
        .update(req.body,
          {where: {id: req.params.id}})
      db.Product.findByPk(updates[0]).then(result => res.json(result))
    }
  );
  app.delete("/products/:id", (req, res) =>
    db.Product
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

};
