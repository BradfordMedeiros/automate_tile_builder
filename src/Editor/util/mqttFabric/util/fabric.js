import { fabric } from 'fabric';

let id = 0; // maybe use uuid?

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


export default (canvasRef, height, width, {
  onElementSelected,
}) => {
  const canvas = createCanvas(canvasRef, height, width);

  let selectedObject = null;
  let selectedColor = 'red';
  canvas.on('object:selected', event => {
    console.log('object selected!');
    selectedObject = event.target;
    if(onElementSelected){
      if (selectedObject !== null && (selectedObject.id === undefined)){
        throw (new Error('selected object does not have an id.  This should never happen'));
      }
      onElementSelected(selectedObject, (selectedObject ? selectedObject.id: undefined));
    }
  });

  canvas.on('before:selection:cleared', function() {
    console.log('deslected!!!!!!!!')
    onElementSelected(null);
  });

  canvas.on('object:added', event => {
    console.log('object added!');
    const object = event.target;
    object.id = id;
    id = id + 1;
    window.o = object;
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
