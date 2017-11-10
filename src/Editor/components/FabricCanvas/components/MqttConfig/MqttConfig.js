import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import State from './components/State';
import Click from './components/Click';

const styles = {
  outer: { padding: 18, border: '1px solid black', display: 'flex',  flexDirection: 'column' },
  holder: { display: 'flex',  justifyContent: 'space-evenly', color: 'whitesmoke', borderBottom: '1px solid rgb(30,30,30)' },
  selected: (menu, type) => ({ cursor: 'pointer', color: menu === type ? 'blue': undefined }),
};

class MqttConfig extends Component {
  state = {
    stateMqttTopic: null,
    stateCondition: null,
    stateMqttValue: null,

    menu: 'state',
  };
  handleChange = (event, index, stateValue) => this.setState({stateValue});

  hasChanged = () => {
    const { mqttTopic, condition, mqttValue } = this.props;
    if (this.state.stateMqttTopic !== null && this.state.stateMqttTopic !== mqttTopic) {
      return true;
    }
    if (this.state.stateCondition !== null && this.state.stateCondition !== condition){
      return true;
    }
    if (this.state.stateMqttValue !== null && this.state.stateMqttValue !== mqttValue){
      return true;
    }
    return false;
  };
  handleRevert = () => {
    this.setState({
      stateMqttTopic: null,
      stateCondition: null,
      stateMqttValue: null,
    });
  };
  canApply = () => (this.state.stateMqttTopic !== null || this.state.stateMqttValue !== null || this.state.stateCondition !== null);
  handleApply = () => {
    this.props.onApply({
      topic: this.state.stateMqttTopic === null ? this.props.stateMqttTopic: this.state.stateMqttTopic,
      value: this.state.stateMqttValue === null ? this.props.stateMqttValue: this.state.stateMqttValue,
      condition: this.state.stateCondition === null ? this.props.stateCondition: this.state.stateCondition,
    });
  };
  render() {
    return (
      <div style={styles.outer}>
        <div style={styles.holder}>
          <div style={styles.selected(this.state.menu,'state')}  onClick={() => { this.setState({ menu: 'state' }); }}>State</div>
          <div style={styles.selected(this.state.menu,'click')}  onClick={() => { this.setState({ menu: 'click' }); }}>Click</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(this.state.menu === 'state') && (
              <State
                condition={this.state.stateCondition || this.props.stateCondition}
                onCondition={stateCondition => {
                  console.log('on condition: ', stateCondition)
                  this.setState({
                    stateCondition,
                  });
                }}
                mqttTopic={this.state.stateMqttTopic === null ? this.props.stateMqttTopic: this.state.stateMqttTopic}
                onMqttTopic={stateMqttTopic => {
                  this.setState({
                    stateMqttTopic,
                  });
                }}
                mqttValue={this.state.stateMqttValue === null ?  this.props.stateMqttValue: this.state.stateMqttValue}
                onMqttValue={(stateMqttValue) => {
                  this.setState({
                    stateMqttValue,
                  });
                }}
              />
          )}
          {(this.state.menu === 'click') && (
            <Click

            />
          )}
          <div>
            <FlatButton onClick={this.handleRevert} disabled={!this.hasChanged()} label="Revert" />
            <FlatButton disabled={!this.canApply()} onClick={this.handleApply} label="Apply" />
          </div>
        </div>
      </div>
    );
  }
};

MqttConfig.propTypes = {
  stateMqttTopic: PropTypes.string,
  stateCondition: PropTypes.string,
  stateMqttValue: PropTypes.string,
  onApply: PropTypes.func,
};

export default MqttConfig;