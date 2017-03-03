var bodyParser = require('body-parser');

module.exports = function(app) {
  app.set('views', './client/views');
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', function (req, res) {
    res.render('index', {orders: [{id: 1}, {id: 2}]})
  })
  .get('/create', function(req, res) {
    app.models.PizzaType.find(null, function(err, pizzaTypes) {
      res.render('create', {pizzaTypes: pizzaTypes})
    });
  })
  .post('/create', function(req, res) {
    console.log(req.body)
    var order,
    orderItems = [];

    req.body.orderItems.forEach(function(item) {
      console.log(item)
      if (item.quantity !== '0') {
        orderItems.push(
          {
            pizzaTypeId: item.type,
            quantity: item.quantity
          }
        )
      }
    });

    console.log(orderItems)

    app.models.OrderItem.create(orderItems, function(err, items) {
      console.log(err)
      if (err) {
        res.send(err)
        return
      }
      app.models.Order.create({
        orderItemIds: items.map(function(item) {return item.id})
      }, function(err, order) {
        res.send(order)
      })
    });
  })
}
