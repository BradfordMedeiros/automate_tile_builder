
import React, { Component, PropTypes } from 'react';
import EditorToolbar from './components/EditorToolbar';
import FabricCanvas from './components/FabricCanvas/FabricCanvas';
import getMqttFabric from './util/mqttFabric/mqttFabric';
import { SketchPicker } from 'react-color';

const mqttBrokerURL =`http://127.0.0.1:4000`;

/*
  information: {
    type: text, or other
    removeSubscription (call when want to get rid of it)
    if text:

    if other:
    topic,
    condition,
    value,

  }

 */

class Editor extends Component {
  fabric = null;
  selectedElement = null;
  state = {
    background: '#fff',
  };
  handleChangeComplete = (color) => {
    this.fabric.onChangeColor(color.hex);
    this.setState({ background: color.hex })
  };
  onElementSelected  =  (selectedElement, id) => {
    this.selectedElement = selectedElement;
    if (selectedElement){
      const information = this.fabric.getMqttInformation(selectedElement);
      this.setState({
        information,
      });
    }
  };
  createCanvas = ref => {
    if (ref && !this.fabric) {
      console.warn('need to figure out how to properly set height/width');
      this.fabric = getMqttFabric(mqttBrokerURL, ref, 500, 500, {onElementSelected: this.onElementSelected});
    }
  }
  render(){
    const { information } = this.state;

    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <EditorToolbar
          onAddRect={() => {
            this.fabric.addRect();
          }}
          onAddText={text => {
            this.fabric.addText(text);
          }}
          onSetDrawingMode={() => {
            this.fabric.setFree();
          }}
          onSetObjectMode={() => {
            this.fabric.stopFree();
          }}
          onAddSubscription={topic => {
            this.fabric.addMqttText(topic);
          }}
          onAddRectSubscription={topic =>  {
            this.fabric.addMqttRect(topic);
          }}
        />
        <FabricCanvas
          selectedElement={information}
          onApplyMqttSettings={({ topic, condition, value }) => {

            this.fabric.updateMqttRect(this.selectedElement, topic, condition, value);
          }}
          onCanvasRef={ref => {
            this.createCanvas(ref);
          }}
        />
        <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
          <SketchPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div>
      </div>
    )
  }
}

export default Editor;