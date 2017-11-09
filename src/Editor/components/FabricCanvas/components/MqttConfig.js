import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class MqttConfig extends Component {
  state = {
    mqttTopic: null,
    condition: null,
    mqttValue: null,
    value: 0,
  };
  handleChange = (event, index, value) => this.setState({value});

  hasChanged = () => {
    const { mqttTopic, condition, mqttValue } = this.props;
    if (this.state.mqttTopic !== null && this.state.mqttTopic !== mqttTopic) {
      return true;
    }
    if (this.state.condition !== null && this.state.condition !== condition){
      return true;
    }
    if (this.state.mqttValue !== null && this.state.mqttValue !== mqttValue){
      return true;
    }
    return false;
  };
  handleRevert = () => {
    const { onRevert } = this.props;
    this.setState({
      mqttTopic: null,
      condition: null,
      mqttValue: null,
    });
    onRevert();
  };
  handleApply = () => {

  };
  render() {
    return (
      <div style={{ padding: 18, border: '1px solid black', display: 'flex',  flexDirection: 'column' }}>
        <div>Mqtt Options</div>
        <TextField
          onChange={(_, mqttTopic) => {
            console.log('on  change: ', mqttTopic);
            this.setState({ mqttTopic });
          }}
          floatingLabelText="Mqtt Topic"
        />
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={'=='} primaryText={'=='} />
          <MenuItem value={'!='} primaryText={'!='}/>
          <MenuItem value={'>'} primaryText={'>'} />
          <MenuItem value={'>'} primaryText={'>='} />
          <MenuItem value={'<'} primaryText={'<'}/>
          <MenuItem value={'<'} primaryText={'<='}/>
        </DropDownMenu>
        <TextField floatingLabelText="Mqtt Value" />
        <div>
          <FlatButton onClick={this.handleRevert} disabled={!this.hasChanged()} label="Revert" />
          <FlatButton onClick={this.handleApply} label="Apply" />
        </div>
      </div>
    );
  }
};

MqttConfig.propTypes = {
  mqttTopic: PropTypes.string,
  condition: PropTypes.string,
  mqttValue: PropTypes.string,
  onRevert: PropTypes.func,
  onApply: PropTypes.func,
};

export default MqttConfig;