import { h, Component } from "preact";
import { connect } from "react-redux";

import InputField from "../components/input-group";
import { Field } from "src/interfaces";
import { ADD_FIELD } from "../store/actions";

type FieldProps = {
  fields: Field[];
  onAddGroup: () => void;
};

class FieldsContainer extends Component<FieldProps, {}> {
  render() {
    return (
      <div class="field">
        <h4>Input Fields</h4>
        <div class="fields">
          <h3>-</h3>
          {this.props.fields.length < 1 && <h3>-</h3>}
          {this.props.fields.length > 0 &&
            this.props.fields.map(fieldId => <InputField key={fieldId} field={fieldId} />)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddField: () => dispatch({ type: ADD_FIELD }),
  };
};

const mapStateToProps = state => {
  return {
    fields: state.fields,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsContainer);
