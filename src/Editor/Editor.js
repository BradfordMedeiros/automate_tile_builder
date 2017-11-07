
import React, { Component, PropTypes } from 'react';
import EditorToolbar from './components/EditorToolbar';
import FabricCanvas from './components/FabricCanvas';
import getFabric from '../fabric';

class Editor extends Component {
  fabric = null
  createCanvas = ref => {
    console.log('height: ', ref.height);
    console.log('width: ', ref.width);

    console.warn('need to figure out how to properly set height/width');
    this.fabric = getFabric(ref, 500, 500);
    window.f = this.fabric;
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
      </div>
    )
  }
}

export default Editor;