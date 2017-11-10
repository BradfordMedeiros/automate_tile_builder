import getFabric from './util/fabric';
import getMqttManager from './util/mqttManager';

const mqttDataManager = { };

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
    getMqttInformation : element =>  {
      return mqttDataManager[element.id];
    },
    addMqttText: topic => {
      const updateText = fabricCustom.addText(topic);

      const onMqttData = newData => {
        updateText(newData);
      };
      const { removeSubscription } =  mqttManager.addSubscription(topic, onMqttData);
      mqttDataManager[updateText.id] = {
        type: 'text',
        removeSubscription,
        topic,
      }
    },
    updateMqttText: () => {
      console.error('not yet implemented');
    },
    deleteMqttText: () => {
      console.error('not yet implemented');
    },


    // condition: { operator: oneOf( >,<,=,! ), value=<any string>}
    addMqttRect: (topic, initialCondition, initialValue) => {
      const rectFabric = fabricCustom.addRect();

      const show= () => {
        console.log('show!');
        rectFabric.set({
          opacity: 1,
          selectable: true,
        })
        fabricCustom.canvas.renderAll();
      };
      const hide = () => {
        console.log('hide!');
        rectFabric.set({
          opacity: 0,
          selectable: false,
        })
        fabricCustom.canvas.renderAll();

      };


      const onMqttData = newData => {
        const mqttObject = mqttDataManager[rectFabric.id];
        const condition = mqttObject.condition;
        const value = mqttObject.value;

        console.log('got data: ', newData);
        console.log('condition is: ', condition);
        console.log('value is: ', value);

        if (condition === '==') {
          if (newData === value) {
            show();
          } else {
            hide();
          }
        } else if (condition === '>') {
          if (newData > value) {
            show();
          } else {
            hide();
          }
        } else if (condition === '<') {
          if (newData < value) {
            show();
          } else {
            hide();
          }
        } else if (condition === '!=') {
          if (newData !== value) {
            show();
          } else {
            hide();
          }
        } else {
          show();
        }
      }

      const { removeSubscription, updateSubscription } =  mqttManager.addSubscription(topic, onMqttData);
      mqttDataManager[rectFabric.id] = {
        type: 'object',
        removeSubscription,
        updateSubscription,
        topic,
        condition: initialCondition,
        value: initialValue,
      };
    },
    updateMqttRect: (selectedElement, topic, condition, value) => {
      console.log('updating mqtt rect');
      console.log('-- mqtt  rect id is: ', selectedElement.id);
      console.log('new toppic: ', topic);
      console.log('new condition: ', condition);
      console.log('new value: ', value);

      const elementId = selectedElement.id;
      const managedItem = mqttDataManager[elementId];
      if (managedItem.updateSubscription){
        managedItem.updateSubscription(topic);
        managedItem.topic = topic;
        managedItem.condition = condition;
        managedItem.value = value;
        console.log('yay update sub!');
      }else{
        console.error('for now not going to update rect that istn an mqtt rect');
      }

    },
    deleteMqttRect: () => {
      console.error('not yet impllemented');
    }
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