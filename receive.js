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

    // inisiasi nama queue
    var queue = 'pesanku';

    // pengaturan durability queue
    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1);
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    // menerima pesan dari rabbitMQ server (bersifat standby)
    channel.consume(
      queue,
      function (msg) {
        console.log(' [x] Received %s', msg.content.toString());
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );
  });
});
