import { h, Component } from "preact";
import { connect } from "react-redux";
import InputGroup from "../components/input-group";
import { Group } from "src/interfaces";

type GroupProps = {
  groups: Group[];
};

class GroupsContainer extends Component<GroupProps, {}> {
  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => {
  console.info("Groups Container");
  console.info(state);
  return {
    groups: state.groups,
  };
};

export default connect(mapStateToProps, null)(GroupsContainer);
