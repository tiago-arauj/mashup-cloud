(async () => {
    const enigma = require('enigma.js');
    const schema = require('enigma.js/schemas/12.612.0');
    const WebSocket = require('ws');
  
    // replace with your information
    const appId = '<fdf3fa37-f6b7-43e2-bb0f-6862124dee7b>';
    const tenant = '<2x4essgkgudqooz.us.qlikcloud.com>';
    const apiKey = '<XiLh3EgX-n7mt0wp9BVMMZp-yPafRcIPDU8c>';
  
    const url = `wss://${tenant}/app/${appId}`;
  
    const session = enigma.create({
      schema,
      createSocket: () =>
        new WebSocket(url, {
          headers: { Authorization: `Bearer ${apiKey}` },
        }),
    });
  
    // bind traffic events to log what is sent and received on the socket:
    session.on('traffic:sent', (data) => console.log('sent:', data));
    session.on('traffic:received', (data) => console.log('received:', data));
  
    // open the socket and eventually receive the QIX global API, and then close
    // the session:
    try {
      const global = await session.open();
      console.log('You are connected!');
      await session.close();
      console.log('Session closed!');
    } catch (err) {
      console.log('Something went wrong :(', err);
    }
  })();