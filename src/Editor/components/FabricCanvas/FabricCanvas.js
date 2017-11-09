import React, { PropTypes, Component } from 'react';
import MqttConfig from './components/MqttConfig/MqttConfig';

class FabricCanvas extends Component {
  render() {

    const { onCanvasRef, onApplyMqttSettings } = this.props;
    return (
      <div style={{
        height: 'calc(70% - 80px)',
        top: 80,
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(rgb(40,40,40),rgb(30,30,30))',
        border: '1px solid black',
        boxShadow: '0px 0px 8px 1px black',
      }}>
        <div className="canvas_wrapper" style={{ width: 700 }}>
          <canvas
            ref={onCanvasRef}
            style={{ height: '100%', width: 500, height: 500, border: '1px solid white' }}
          />
        </div>
        <MqttConfig
          stateMqttValue={'test'}
          stateCondition={'>'}
          stateMqttTopic={'30'}
          onApply={onApplyMqttSettings}
        />
      </div>
    );
  }
};

FabricCanvas.propTypes = {
  onCanvasRef: PropTypes.func, // probably need a component unmount thing to
  onApplyMqttSettings: PropTypes.func,
};

export default FabricCanvas;