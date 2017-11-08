const mqtt = require('mqtt');


const getMqttManager = mqttUrl => {

  const mqttSubscribe = (topic, onData) => {
    // probably should overload this to make it on a single connection? maybe, probably no noticeable gains, at least
    // for a long while
    // also, if that matters, maybe we should do that via overloading the interface, and just use this
    // since using this interface is super convenient, and overload the interface to introduce batching later
    const client = mqtt.connect(mqttUrl);
    client.on('connect', () => {
      console.log('connected: ', topic);
      client.subscribe(topic);
    });
    client.on('message', (topic, message) => {
      console.log('message: ');
      console.log('topic: ', topic);
      console.log('message: ', message.toString());
      onData(message.toString());
    });

    return ({
      removeSubscription: () => client.end(),
    })
  };


  return ({
    addSubscription: (topic, onData, condition) => mqttSubscribe(topic, onData),
  });
}

export default getMqttManager;