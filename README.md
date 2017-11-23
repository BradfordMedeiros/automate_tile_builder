# canvas_data_binding
Drawing application built on html canvas that allows a user to sketch (think painting programs), and interface with data provided by mqtt.   Connects to automate broker (can be any broker, but obviously this is ideally automate -- but don't want to require this! -- shouldn't break generic ability to work with any broker!!!)

Current Mqtt functionality:
- raw mqtt value text display
- condition mqtt rendering based upon state of value
