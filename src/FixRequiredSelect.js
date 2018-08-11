import React from "react";
import PropTypes from "prop-types";

const noop = () => {};

class FixRequiredSelect extends React.Component {
  state = {
    value: this.props.value || "",
  };

  selectRef = null;
  setSelectRef = ref => {
    this.selectRef = ref;
  };

  onChange = (value, actionMeta) => {
    this.props.onChange(value, actionMeta);
    this.setState({ value });
  };

  render() {
    const { SelectComponent, required, ...props } = this.props;

    return (
      <div>
        <SelectComponent
          {...props}
          ref={this.setSelectRef}
          onChange={this.onChange}
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, width: "100%", height: 0, position: "absolute" }}
          value={this.state.value || ""}
          onChange={noop}
          onFocus={() => this.selectRef.focus()}
          required={required}
        />
      </div>
    );
  }
}

FixRequiredSelect.defaultProps = {
  onChange: noop,
};

FixRequiredSelect.protoTypes = {
  // react-select component class (e.g. Select, Creatable, Async)
  selectComponent: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FixRequiredSelect;
