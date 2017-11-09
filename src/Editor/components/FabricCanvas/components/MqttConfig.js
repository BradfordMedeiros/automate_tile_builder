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

  render() {
    return (
      <div style={{ padding: 18, border: '1px solid black', display: 'flex',  flexDirection: 'column' }}>
        <div>Mqtt Options</div>
        <TextField floatingLabelText="Mqtt Topic" />
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
          <FlatButton label="Revert" />
          <FlatButton label="Apply" />
        </div>
      </div>
    );
  }
};

MqttConfig.propTypes = {
  disabled: PropTypes.string,
  mqttTopic: PropTypes.string,
  condition: PropTypes.string,
  mqttValue: PropTypes.string,
};

export default MqttConfig;