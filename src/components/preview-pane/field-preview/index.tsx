import { h, Component } from "preact";

import Button from "../../button";
import "./style";
import { Group, Field } from "src/interfaces";

interface Props {
  group: Group;
}

export default class FieldPreview extends Component<Props> {
  types = {
    String: this.renderInput.bind(this),
    StringValues: this.renderValues.bind(this),
    Boolean: this.renderCheckbox.bind(this),
    Image: this.renderImage.bind(this),
    Number: this.renderInput.bind(this),
    URL: this.renderInput.bind(this),
    StringArray: this.renderStringArray.bind(this),
    TimeRange: this.renderTimeRange.bind(this),
    Duration: this.renderDuration.bind(this),
  };

  inputs = {
    String: "text",
    Number: "number",
    URL: "url",
  };
  // constructor(props) {
  //   super(props);

  //   this.state = { ...this.props.field };
  // }

  renderTooltip(text: string) {
    return (
      <span class="tooltipContainer">
        <svg data-icon-name="InfoIcon" class="icon" viewBox="0 0 16 16" style="transform: rotate(0deg);">
          <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M8,14 C4.7,14 2,11.3 2,8 C2,4.7 4.7,2 8,2 C11.3,2 14,4.7 14,8 C14,11.3 11.3,14 8,14 Z M7,7 L7,12 L9,12 L9,7 L7,7 Z M8,6 C8.55228475,6 9,5.55228475 9,5 C9,4.44771525 8.55228475,4 8,4 C7.44771525,4 7,4.44771525 7,5 C7,5.55228475 7.44771525,6 8,6 Z" />
        </svg>
        <div class="tooltip">{text}</div>
      </span>
    );
  }

  renderCheckbox(field: Field) {
    return (
      <div class="field">
        <label class="fieldLabel">
          <input type="checkbox" class="checkbox" />
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </label>
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  renderInput(field: Field) {
    return (
      <div class="field">
        <div class="fieldLabel">
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </div>
        <input type={this.inputs[field.type]} class="textInput" />
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  renderValues(field: Field) {
    const values = field.constraints[field._constraintId].value;
    return (
      <div class="field">
        <div class="fieldLabel">
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </div>
        <div class="valuesInputs">
          <div class="selectWrapper">
            <select>
              {Object.keys(values).map(id => (
                <option key={id} value={values[id].value}>
                  {values[id].label}
                </option>
              ))}
            </select>
            <svg
              data-icon-name="PointerDownIcon"
              class="dropdownIcon"
              viewBox="0 0 16 16"
              style="transform: rotate(0deg);"
            >
              <polygon fill-rule="evenodd" points="3 6 8 11 13 6" />
            </svg>
          </div>
        </div>
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  renderTimeRange(field: Field) {
    return (
      <div class="field">
        <div class="fieldLabel">
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </div>
        {/* <input type={this.inputs[field.type]} class="textInput" /> */}
        <div class="timeRangeInputs">
          <div class="textInputDiv">
            <span class="timeRange">
              <svg data-icon-name="ClockIcon" class="icon" viewBox="0 0 16 16" style="transform: rotate(0deg);">
                <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M8,14 C4.7,14 2,11.3 2,8 C2,4.7 4.7,2 8,2 C11.3,2 14,4.7 14,8 C14,11.3 11.3,14 8,14 Z M9,4 L7,4 L7,9 L12,9 L12,7 L9,7 L9,4 Z" />
              </svg>
              <span class="digitInput">--</span>
              <span class="digitInput">--</span>
              <span class="digitInput">--</span>
            </span>
          </div>
          <span class="divider">–</span>
          <div class="textInputDiv">
            <span class="timeRange">
              <svg data-icon-name="ClockIcon" class="icon" style="transform: rotate(0deg);">
                <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M8,14 C4.7,14 2,11.3 2,8 C2,4.7 4.7,2 8,2 C11.3,2 14,4.7 14,8 C14,11.3 11.3,14 8,14 Z M9,4 L7,4 L7,9 L12,9 L12,7 L9,7 L9,4 Z" />
              </svg>
              <span class="digitInput">--</span>
              <span class="digitInput">--</span>
              <span class="digitInput">--</span>
            </span>
          </div>
        </div>
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  renderDuration(field: Field) {
    return (
      <div class="field">
        <div class="fieldLabel">
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </div>
        <div className="durationInputs">
          <input type="number" class="textInput" />
          <span class="divider" />
          <div class="selectWrapper">
            <select>
              <option value="0">Seconds</option>
              <option value="1">Minutes</option>
              <option value="2" selected>
                Hours
              </option>
              <option value="3">Days</option>
            </select>
            <svg
              data-icon-name="PointerDownIcon"
              class="dropdownIcon"
              viewBox="0 0 16 16"
              style="transform: rotate(0deg);"
            >
              <polygon fill-rule="evenodd" points="3 6 8 11 13 6" />
            </svg>
          </div>
        </div>
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  renderImage(field: Field) {
    return (
      <div class="field">
        <div class="fieldLabel">
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </div>
        <Button text="Add Image" buttonClass="secondary" clickHandler={() => undefined}>
          <svg data-icon-name="PlusIcon" class="plus-icon icon" viewBox="0 0 16 16" style="transform: rotate(0deg);">
            <path d="M15,7 L9,7 L9,1 C9,0.4 8.6,0 8,0 C7.4,0 7,0.4 7,1 L7,7 L1,7 C0.4,7 0,7.4 0,8 C0,8.6 0.4,9 1,9 L7,9 L7,15 C7,15.6 7.4,16 8,16 C8.6,16 9,15.6 9,15 L9,9 L15,9 C15.6,9 16,8.6 16,8 C16,7.4 15.6,7 15,7 Z" />
          </svg>
        </Button>
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  renderStringArray(field: Field) {
    return (
      <div class="field">
        <div class="fieldLabel">
          <span class="label">{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </div>
        <div className="stringArrayInput">
          <Button text="One more option" buttonClass="secondary" clickHandler={() => undefined}>
            <svg data-icon-name="PlusIcon" class="plus-icon icon" viewBox="0 0 16 16" style="transform: rotate(0deg);">
              <path d="M15,7 L9,7 L9,1 C9,0.4 8.6,0 8,0 C7.4,0 7,0.4 7,1 L7,7 L1,7 C0.4,7 0,7.4 0,8 C0,8.6 0.4,9 1,9 L7,9 L7,15 C7,15.6 7.4,16 8,16 C8.6,16 9,15.6 9,15 L9,9 L15,9 C15.6,9 16,8.6 16,8 C16,7.4 15.6,7 15,7 Z" />
            </svg>
          </Button>
        </div>
        {field.footnote && <p class="footnote">{field.footnote}</p>}
      </div>
    );
  }

  render({ group }) {
    return (
      <div class="group">
        {/* Group Title */}
        <h5 class="title">{group.title}</h5>
        <div class="groupFields">
          {Object.keys(group.fields).map(fieldId => {
            const field = group.fields[fieldId];
            if (field.type === "String" && Object.keys(field.constraints).length > 0) {
              Object.keys(field.constraints).forEach(constraintId => {
                if (field.constraints[constraintId].type === "values") {
                  field.type = "StringValues";
                  field._constraintId = field.constraints[constraintId]._id;
                }
              });
            }
            return this.types[field.type](field);
          })}
        </div>
      </div>
    );
  }
}
