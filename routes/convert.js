var express = require('express');
var router = express.Router();
var SSE = require('express-sse');
var sse = new SSE();
var roman = {
  map: [
    100, 'C', 90, 'XC', 50, 'L', 40, 'XL', 10, 'X', 9, 'IX', 5, 'V', 4, 'IV', 1, 'I'
  ],
  convert: function(n) {
    var value = '';
    for (var idx = 0; n > 0 && idx < this.map.length; idx += 2) {
      while (n >= this.map[idx]) {
        value += this.map[idx + 1];
        n -= this.map[idx];
      }
    }
    return value;
  }
};

router.post('/', function(req, res, next) {
  sse.send(roman.convert(req.body.number), 'converted');
  res.send('ok')
});

router.get('/listen-for-conversion', sse.init );

module.exports = router;
