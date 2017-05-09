var SerialPort = require('serialport');

function register (
  {
    horizontalIncrement,
    horizontalDecrement,
    verticalIncrement,
    verticalDecrement,
    clear
  },
  portString = '/dev/cu.SLAB_USBtoUART'
) {
  var port = new SerialPort(portString, {
    baudRate: 9600,
    parser: SerialPort.parsers.readline('\n'),
    autoOpen: false,
  });

  port.open(err => {
    console.log("CONNECTED?", err)
    if (!err) {
      port.on('data', line => {
        switch (line.trim()) {
          case 'INCR_HORIZONTAL':
            horizontalIncrement();
            break;
          case 'DECR_HORIZONTAL':
            horizontalDecrement();
            break;
          case 'INCR_VERTICAL':
            verticalIncrement();
            break;
          case 'DECR_VERTICAL':
            verticalDecrement();
            break;
          case 'CLEAR':
            clear();
            break;
        }
      })
    } else {
      throw new Error('failed to open port ' + portString)
    }
  })
}

module.exports = { register };
