// set library rabbitMQ client
var amqp = require('amqplib/callback_api');

// pengaturan konfigurasi server rabbitMQ
server = {
  protocol: 'amqp',
  hostname: 'rmq2.pptik.id',
  port: 5672,
  username: 'TMDG2022',
  password: 'TMDG2022',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 0,
  vhost: '/TMDG2022',
};

// mengkoneksikan rabbitMQ server
amqp.connect(server, function (error0, connection) {
  if (error0) {
    throw error0;
  }

  // membuat channel
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    // inisiasi nama queue dan isi pesan
    var queue = 'pesanku';
    var msg = 'isi pesan bakso boleh juga';

    // pengaturan durability queue
    channel.assertQueue(queue, {
      durable: true,
    });

    // mengirim pesan ke queue
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    });
    console.log(' [x] Sent %s', msg);
  });

  // menutup koneksi
  setTimeout(function () {
    connection.close;
    process.exit(0);
  }, 500);
});
