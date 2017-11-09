import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const conditionTypes = ['==', '!=', '>', '>=', '<', '<='];

const State = ({ mqttTopic, onMqttTopic, condition,  onCondition, mqttValue, onMqttValue }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <TextField
      floatingLabelText="Mqtt Topic"
      value={mqttTopic  || ''}
      onChange={(_, mqttTopic) => {
        onMqttTopic(mqttTopic);
      }}
    />
    <DropDownMenu value={conditionTypes.indexOf(condition)} onChange={(value, v) => {
      const condition = conditionTypes[v];
      onCondition(condition);
    }}>
      {conditionTypes.map((condition, index) => <MenuItem value={index} primaryText={condition} />)}
    </DropDownMenu>
    <TextField
      floatingLabelText="Mqtt Value"
      value={mqttValue || ''}
      onChange={(_, mqttValue) => {
        onMqttValue(mqttValue);
      }}
    />
  </div>
);

State.propTypes = {
  mqttTopic: PropTypes.string,
  onMqttTopic: PropTypes.func,
  condition: PropTypes.string,
  onCondition: PropTypes.func,
  mqttValue: PropTypes.string,
  onMqttValue: PropTypes.func,
};

export default State;