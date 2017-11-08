import { fabric } from 'fabric';

const createCanvas = (canvasRef, height = 500, width = 500) => {
  const canvas = new fabric.Canvas(canvasRef);
  canvas.setDimensions({ height, width });
  return canvas;
};

const getRect = color => {
  const rect = new fabric.Rect({
    top : 100,
    left : 100,
    width : 60,
    height : 70,
    fill : color,
  });
  return rect;
};

const getText = (text = 'default',  color) => {
  const fabricText = new fabric.Text(text, {
    left: 100,
    top: 100,
    fill: color,
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


export default (canvasRef, height, width) => {
  const canvas = createCanvas(canvasRef, height, width);

  let selectedObject = null;
  let selectedColor = 'red';
  canvas.on('object:selected', event => {
    console.log('object selected!');
    selectedObject = event.target;
  });

  return {
    canvas,
    onChangeColor: color => {
      // check if object is selected, if so color it
      canvas.freeDrawingBrush.color = color;
      selectedColor = color;
    },
    deleteSelected: () => {
      selectedObject.remove();
    },
    deleteSelectedGroup: () => {
      const objects = selectedObject._objects.map(x =>x);
      objects.forEach(obj => obj.remove());
      canvas.discardActiveGroup();
      canvas.renderAll();
    },
    addRect: () => {
      const fabricRect = getRect(selectedColor);
      canvas.add(fabricRect);
      return fabricRect;
    },
    addText: text => {
      const fabricText = getText(text,  selectedColor);
      canvas.add(fabricText);
      return newText => updateText(canvas, fabricText, newText);
    },
    setFree: () => {
      setFreeDrawMode(canvas);
    },
    stopFree: () => {
      stopFreeDrawMode(canvas);
    },
  };
};
