import getFabric from './util/fabric';
import getMqttManager from './util/mqttManager';

const getMqttFabric = (mqttBrokerUrl, canvasRef, height, width) => {
  const fabricCustom = getFabric(canvasRef, height, width);

  window.fc = fabricCustom;
  const mqttManager = getMqttManager(mqttBrokerUrl);

  return ({
    //deleteSelected: fabricCustom.deleteSelected, // need to make special if it's mqtt data
    //deleteSelectedGroup: fabricCustom.deleteSelectedGroup,
    onChangeColor: fabricCustom.onChangeColor,
    addRect: fabricCustom.addRect,
    addText: fabricCustom.addText,
    setFree: fabricCustom.setFree,
    stopFree: fabricCustom.stopFree,
    addMqttText: topic => {
      const updateText = fabricCustom.addText(topic);

      const onMqttData = newData => {
        updateText(newData);
      };
      const { removeSubscription } =  mqttManager.addSubscription(topic, onMqttData);
    },
    // condition: { operator: oneOf( >,<,=,! ), value=<any string>}
    addMqttRect: (topic, condition) => {
      const rectFabric = fabricCustom.addRect();

      const onMqttData = newData => {
        console.log('mqtt data got data');
        //updateText(newData);
        if (newData !== 'cool'){
          rectFabric.set({
            opacity: 0,
            selectable: false
          })
          fabricCustom.canvas.renderAll();
        }else{
          rectFabric.set({
            opacity: 1,
            selectable: true
          })
          fabricCustom.canvas.renderAll();
        }
      };
      const { removeSubscription } =  mqttManager.addSubscription(topic, onMqttData);
    },
  });
}


/*
 createSubscription: mqttTopic => {
 const fabricText = getText(mqttTopic, selectedColor);
 canvas.add(fabricText);
 return mqttSubscribe(mqttTopic, newData =>  {
 updateText(canvas, fabricText, newData);
 });
 },
 */
export default getMqttFabric;