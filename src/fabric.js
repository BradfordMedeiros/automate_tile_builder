import { fabric } from 'fabric';

const createCanvas = (canvasRef, height = 500, width = 500) => {
  const canvas = new fabric.Canvas(canvasRef);
  canvas.setDimensions({ height, width });
  return canvas;
};

const getRect = () => {
  const rect = new fabric.Rect({
    top : 100,
    left : 100,
    width : 60,
    height : 70,
    fill : 'red'
  });
  return rect;
};

const getText = (text = 'default') => {
  const fabricText = new fabric.Text(text, {
    left: 100,
    top: 100,
    fill: 'black',
    angle: 0,
  });
  return fabricText;
};

const updateText = (canvas, FabricText, newText) => {
  FabricText.setText(newText);
  canvas.renderAll();
};

const setFreeDrawMode = canvas => {
  canvas.isDrawingMode = true;
};

const stopFreeDrawMode = canvas => {
  canvas.isDrawingMode = false;
};


const mqttSubscriptions = [];

const mqttSubscribe = (topic, onData) => {
  if (typeof(topic) !== typeof('')){
    throw (new Error('topic must be string'));
  }
  if (typeof(onData) !== typeof(()=>{})){
    throw (new Error('on data must be function'));
  }
  mqttSubscriptions.push(topic);
  const handle = setInterval(() => {
    onData((Math.random() * 20).toString());
  }, 1000);

  return {
    stop: () => clearInterval(handle),
  }
};

export default (canvasRef, height, width) => {
  const canvas = createCanvas(canvasRef, height, width);

  return {
    fabric,
    canvas,
    addRect: () => {
      canvas.add(getRect());
    },
    addText: text => {
      const fabricText = getText(text);
      canvas.add(fabricText);
      return fabricText;
    },
    setFree: () => {
      setFreeDrawMode(canvas);
    },
    stopFree: () => {
      stopFreeDrawMode(canvas);
    },

    createSubscription: mqttTopic => {
      const fabricText = getText(mqttTopic);
      canvas.add(fabricText);
      return mqttSubscribe(mqttTopic, newData =>  {
        updateText(canvas, fabricText, newData);
      });
    },

  };
};

/*

 import { fabric } from 'fabric';

 const createCanvas = (canvasRef, height = 500, width = 500) => {
 const canvas = new fabric.Canvas(canvasRef);
 return canvas;
 };

 const getRect = () => {
 const rect = new fabric.Rect({
 top : 100,
 left : 100,
 width : 60,
 height : 70,
 fill : 'red'
 });
 return rect;
 };

 const getText = (text = 'default') => {
 const fabricText = new fabric.Text(text, {
 left: 100,
 top: 100,
 fill: 'black',
 angle: 0,
 });
 return fabricText;
 };

 const updateText = (canvas, FabricText, newText) => {
 FabricText.setText(newText);
 canvas.renderAll();
 };

 const setFreeDrawMode = canvas => {
 canvas.isDrawingMode = true;
 };

 const stopFreeDrawMode = canvas => {
 canvas.isDrawingMode = false;
 };


 const mqttSubscriptions = [];

 const mqttSubscribe = (topic, onData) => {
 if (typeof(topic) !== typeof('')){
 throw (new Error('topic must be string'));
 }
 if (typeof(onData) !== typeof(()=>{})){
 throw (new Error('on data must be function'));
 }
 mqttSubscriptions.push(topic);
 const handle = setInterval(() => {
 onData((Math.random() * 20).toString());
 }, 1000);

 return {
 stop: () => clearInterval(handle),
 }
 };

 export default getCanvas = canvasRef => {
 const canvas = createCanvas(canvasRef);

 return {
 addRect: () => {
 canvas.add(getRect());
 },
 addText: text => {
 const fabricText = getText(text);
 canvas.add(fabricText);
 return fabricText;
 },
 setFree: () => {
 setFreeDrawMode(canvas);
 },
 stopFree: () => {
 stopFreeDrawMode(canvas);
 },

 createSubscription: mqttTopic => {
 const fabricText = getText(mqttTopic);
 canvas.add(fabricText);
 return mqttSubscribe(mqttTopic, newData =>  {
 updateText(canvas, fabricText, newData);
 });
 },

 };
 };

 */
