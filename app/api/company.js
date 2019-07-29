module.exports = (app, db) => {
  app.get("/companies", (req, res) =>
    db.Company.findAll({include: [{model: db.Product, as: 'products'}]}).then(result => res.json(result))
  );
  app.get("/companies/:id", (req, res) =>
    db.Company.findByPk(req.params.id, {include: [{model: db.Product, as: 'products'}]}).then(result => res.json(result))
  );
  app.post("/companies", (req, res) =>
    db.Company
      .create({
        name: req.body.name,
        description: req.body.description,
        company_type: req.body.company_type
      })
      .then(result => res.json(result))
  );
  app.put("/companies/:id", async (req, res) => {
      const updates = await db.Company
        .update(req.body,
          {where: {id: req.params.id}})
      db.Company.findByPk(updates[0]).then(result => res.json(result))
    }
  );
  app.delete("/companies/:id", (req, res) =>
    db.Company
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

};
