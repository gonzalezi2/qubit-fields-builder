import { h, Component } from "preact";
import { connect } from "react-redux";
import linkState from "linkstate";
import "./style.scss";

import Button from "../button";
import { Group } from "../../interfaces";
import { DELETE_GROUP, ADD_FIELD, UPDATE_GROUP } from "../../store/actions";

type GroupProps = {
  group: Group;
  onDeleteGroup: () => void;
  onAddField: () => void;
  onUpdateGroup: (id, group) => void;
};

class InputGroup extends Component<GroupProps, Group> {
  // saveField = (fieldID: string, field: Field) => {
  //   this.setState(state => {
  //     // Checks to see if the field exists before trying to apply a change
  //     // Prevents an error from occurring when deleting a field
  //     if (this.state.fields[fieldID]) {
  //       Object.assign(state.fields[fieldID], field);
  //     }
  //   });
  //   this.props.saveGroup(this.state);
  // };

  // saveConstraint = (fieldID: string, constraintID: string, constraint: Constraint) => {
  //   this.setState(state => {
  //     if (this.state.fields[fieldID].constraints[constraintID]) {
  //       Object.assign(state.fields[fieldID].constraints[constraintID], constraint);
  //     }
  //   });
  //   this.props.saveGroup(this.state);
  // };

  // deleteConstraint = (fieldID: string, constraintID: string) => {
  //   const newState = Object.assign({}, this.state);
  //   delete newState.fields[fieldID].constraints[constraintID];
  //   this.props.saveGroup(newState);
  //   this.forceUpdate();
  // };

  // addField = () => {
  //   this.props.addField(this.state._id, this.state.id);
  // };

  // deleteGroup = () => {
  //   this.props.deleteGroup(this.state._id);
  // };

  constructor(props: GroupProps) {
    super(props);
    this.state = { ...this.props.group };
    this._onBlur = this._onBlur.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.info(this.state);
  //   console.info(nextState);
  //   if (this.state === nextState) {
  //     return true;
  //   }
  //   return false;
  // }

  // componentDidUpdate() {
  //   console.info("this is the state");
  //   console.info(this.props.group);
  //   this.props.onUpdateGroup(this.props.group._id, this.state);
  // }

  _onBlur(stateProperty) {
    if (this.state[stateProperty] !== this.props.group[stateProperty]) {
      this.props.onUpdateGroup(this.props.group._id, this.state);
    }
  }

  render() {
    return (
      <div class="group-block">
        <div class="group">
          <h4>Group</h4>
          <input
            name="id"
            type="text"
            value={this.state.id}
            onBlur={e => this._onBlur("id")}
            onChange={linkState(this, "id")}
            placeholder="Group Id"
          />
          <input
            name="title"
            type="text"
            value={this.state.title}
            onBlur={() => this._onBlur("title")}
            onChange={linkState(this, "title")}
            placeholder="Group Title"
          />
          <input
            name="subtitle"
            type="text"
            value={this.state.subtitle}
            onBlur={() => this._onBlur("subtitle")}
            onChange={linkState(this, "subtitle")}
            placeholder="Group Subtitle"
          />
          <div class="footer">
            <Button text="Delete Group" buttonClass="text-danger" onClickEvent={this.props.onDeleteGroup} />
            <Button text="Add Input" buttonClass="text" onClickEvent={this.props.onAddField} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.group("mapStateToProps");
  // console.info(props);
  // console.info(state);
  // console.groupEnd("mapStateToProps");
  return {
    group: state.groups.find(group => group._id === props.group._id),
  };
};

const mapDispatchToGroup = dispatch => {
  return {
    onUpdateGroup: (groupId, group) => dispatch({ type: UPDATE_GROUP, groupId, group }),
  };
};

export default connect(mapStateToProps, mapDispatchToGroup)(InputGroup);
