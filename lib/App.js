const util = require('util');
const events = require('events');

var App = function (log) {
  var that = this;
  this.log = log;

  this.log.info('Loxone to MQTT gateway started');

  process.on('SIGINT', function () {
    that.log.info('Loxone to MQTT gateway try to stop');
    that.exit(0, 'SIGINT');
  });
  process.on('SIGHUP', function () {
    that.exit(0, 'SIGHUP');
  });
  process.on('SIGTERM', function () {
    that.exit(0, 'SIGTERM');
  });
};

util.inherits(App, events.EventEmitter);

App.prototype.exit = function (code, message) {
  var that = this;
  this.emit('exit', code);

  process.on('exit', function (code) {
    that.log.info('Loxone to MQTT gateway stopped - ' + message);
  });
};

module.exports = App;
