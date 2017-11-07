
import React, { Component, PropTypes } from 'react';
import EditorToolbar from './components/EditorToolbar';
import FabricCanvas from './components/FabricCanvas';
import getFabric from '../fabric';
import { SketchPicker } from 'react-color';

class Editor extends Component {
  fabric = null
  createCanvas = ref => {
    if (ref && !this.fabric){
      console.log('height: ', ref.height);
      console.log('width: ', ref.width);

      console.warn('need to figure out how to properly set height/width');
      this.fabric = getFabric(ref, 500, 500);
      window.f = this.fabric;
    }
  };
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    window.c = color;

    this.fabric.setPenColor(color.hex);
    this.setState({ background: color.hex })
  };
  render(){

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
            this.fabric.createSubscription(topic);
          }}
        />
        <FabricCanvas
          onCanvasRef={ref => {
            window.r = ref;
            window.fabric = fabric;
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