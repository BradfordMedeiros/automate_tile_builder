import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditorToolbar extends Component {
  state = {
    text: '',
  }
  render() {
    const {
      onAddRect,
      onAddText,
      onSetDrawingMode,
      onSetObjectMode,
      onDeleteSelected,
      onAddSubscription,
    } = this.props;
    return (
      <div style={{
        position: 'relative',
        height: 80,
        width: '100%',
        background: 'rgb(20,20,20)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ display: 'flex' }}>
          <FlatButton onClick={onAddRect} label="Add Rect" />
          <FlatButton
            primary
            label="Add Text"
            onClick={() => {
              onAddText(this.state.text)
            }}
          />
          <TextField
            hintText="Text or MQTT Topic"
            value={this.state.text}
            onChange={(_, text) => {
              this.setState({
                text
              });
            }}
          />
          <RaisedButton
            primary
            label="Add Subscription"
            onClick={() => {
              onAddSubscription(this.state.text)
            }}
          />
          <FlatButton onClick={onSetDrawingMode} label="Set Drawing Mode" />
          <FlatButton onClick={onSetObjectMode} label="Set Object Mode" />
          <FlatButton onClick={onDeleteSelected} label="Delete Selected" />
        </div>
      </div>
    );
  }
}

EditorToolbar.propTypes = {
  onAddText: PropTypes.func,
  onAddCircle: PropTypes.func,
  onSetDrawingMode: PropTypes.func,
  onSetObjectMode: PropTypes.func,
  onDeleteSelected: PropTypes.func,
  onAddSubscription: PropTypes.func,
};

export default EditorToolbar;

