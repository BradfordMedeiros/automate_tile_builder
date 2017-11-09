import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const State = ({ handleChange, onMqttTopic, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <TextField
      onChange={(_, mqttTopic) => {
        onMqttTopic(mqttTopic);
      }}
      floatingLabelText="Mqtt Topic"
    />
    <DropDownMenu value={value} onChange={handleChange}>
      <MenuItem value={'=='} primaryText={'=='} />
      <MenuItem value={'!='} primaryText={'!='}/>
      <MenuItem value={'>'} primaryText={'>'} />
      <MenuItem value={'>'} primaryText={'>='} />
      <MenuItem value={'<'} primaryText={'<'}/>
      <MenuItem value={'<'} primaryText={'<='}/>
    </DropDownMenu>
    <TextField floatingLabelText="Mqtt Value" />
  </div>
);

State.propTypes = {
  handleChange: PropTypes.func,
  onMqttTopic: PropTypes.func,
  value: PropTypes.string,
};

export default State;