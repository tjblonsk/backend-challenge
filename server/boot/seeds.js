module.exports = function(app) {
  var db = app.dataSources.mysqlDs;

  db.autoupdate('PizzaType', function(err) {
    if (err) throw err;

    // app.models.PizzaType.create([{
    //   name: 'Margherita',
    //   price: 5
    // }, {
    //   name: 'Pepperoni',
    //   price: 6
    // }, ], function(err, pizzaTypes) {
    //   if (err) throw err;

    //   console.log('Models created: \n', pizzaTypes);
    // });

    console.log('created PizzaType table');
  })

  db.autoupdate('Order', function(err) {
    if (err) throw err;
    console.log('created Order table');
  })

  db.autoupdate('OrderItem', function(err) {
    if (err) throw err;
    console.log('created OrderItem table');
  })
};
