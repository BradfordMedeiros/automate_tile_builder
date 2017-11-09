import getFabric from './util/fabric';
import getMqttManager from './util/mqttManager';

const getMqttFabric = (mqttBrokerUrl, canvasRef, height, width, {
  onElementSelected,
  onGroupSelected,
} = {}) => {
  const fabricCustom = getFabric(canvasRef, height, width, { onElementSelected });
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
 createSubscription: stateMqttTopic => {
 const fabricText = getText(stateMqttTopic, selectedColor);
 canvas.add(fabricText);
 return mqttSubscribe(stateMqttTopic, newData =>  {
 updateText(canvas, fabricText, newData);
 });
 },
 */
export default getMqttFabric;