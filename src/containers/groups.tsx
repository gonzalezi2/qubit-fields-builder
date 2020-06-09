import { h, Component } from "preact";
import { connect } from "react-redux";

import InputGroup from "../components/input-group";
import { Group } from "src/interfaces";
import Button from "../components/button";
import { ADD_GROUP } from "../store/actions";

type GroupProps = {
  groups: Group[];
  onAddGroup: () => void;
};

class GroupsContainer extends Component<GroupProps, {}> {
  componentDidMount() {
    if (this.props.groups.length < 1) {
      this.props.onAddGroup();
    }
  }

  render() {
    return (
      <div class="container">
        <div class="group-box">
          <div class="group-header">
            <h3>Groups</h3>
          </div>
          <div class="group-body">
            {this.props.groups.length < 1 && (
              <div class="emptyGroup">
                <h3>-</h3>
              </div>
            )}
            {this.props.groups.length > 0 && this.props.groups.map(group => <InputGroup key={group.id} />)}
          </div>
        </div>
        <Button text="Add Group" buttonClass="primary-large" onClickEvent={this.props.onAddGroup} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddGroup: () => dispatch({ type: ADD_GROUP }),
  };
};

const mapStateToProps = state => {
  return {
    groups: state.groups,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
