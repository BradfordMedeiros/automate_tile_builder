import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditorToolbar extends Component {
  state = {
    text: '',
    addType: 'rect',
  }
  render() {
    const {
      onAddRect,
      onAddText,
      onSetDrawingMode,
      onSetObjectMode,
      onDeleteSelected,
      onAddSubscription,
      onAddRectSubscription,
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
          <FlatButton
            primary={this.state.addType === 'rect'}
            onClick={() => {
              this.setState({
                addType: 'rect',
              });
            }}
            label="Add Rect"
          />
          <FlatButton
            primary={this.state.addType === 'text'}
            label="Add Text"
            onClick={() => {
              this.setState({
                addType: 'text',
              });
            }}
          />
          <RaisedButton
            secondary
            label="Add"
            onClick={() => {
              if (this.state.addType === 'text'){
                onAddText(this.state.text);
              }else if (this.state.addType === 'rect'){
                onAddRect();
              }
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
            label="Add With Subscription"
            onClick={() => {
              if (this.state.addType === 'text'){
                onAddSubscription(this.state.text)
              }else if (this.state.addType === 'rect'){
                onAddRectSubscription(this.state.text);
              }
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
  onAddRectSubscription: PropTypes.func,
};

export default EditorToolbar;

