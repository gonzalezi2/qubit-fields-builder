import { h, Component } from 'preact';
import linkState from 'linkstate';
import Button from '../../../button';
import style from './style';

export default class FieldPreview extends Component {
  constructor(props) {
    super(props);

    // this.state = { ...this.props.field };
    this.types = {
      String: this.renderInput.bind(this),
      Boolean: this.renderCheckbox.bind(this),
      Image: this.renderImage.bind(this),
      Number: this.renderInput.bind(this),
      URL: this.renderInput.bind(this),
      Other: ['StringArray', 'TimeRange', 'Duration']
    };

    this.inputs = {
      String: 'text',
      Number: 'number',
      URL: 'url'
    };
  }

  renderTooltip(text) {
    return (
      <span class={style.tooltipContainer}>
        <svg data-icon-name="InfoIcon" class={style.tooltipIcon} viewBox="0 0 16 16" style="transform: rotate(0deg);">
          <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M8,14 C4.7,14 2,11.3 2,8 C2,4.7 4.7,2 8,2 C11.3,2 14,4.7 14,8 C14,11.3 11.3,14 8,14 Z M7,7 L7,12 L9,12 L9,7 L7,7 Z M8,6 C8.55228475,6 9,5.55228475 9,5 C9,4.44771525 8.55228475,4 8,4 C7.44771525,4 7,4.44771525 7,5 C7,5.55228475 7.44771525,6 8,6 Z" />
        </svg>
        <div class={style.tooltip}>
          { text }
        </div>
      </span>
    );
  }

  renderCheckbox(field) {
    return (
      <div class={style.field}>
        <label class={style.fieldLabel}>
          <input type="checkbox" class={style.checkbox} />
          <span class={style.label}>{field.label}</span>
          {field.description && this.renderTooltip(field.description)}
        </label>
        { field.footnote && <p class={style.footnote}>{field.footnote}</p> }
      </div>
    );
  }

  renderInput(field) {
    return (
      <div class={style.field}>
        <div class={style.fieldLabel}>
          <span class={style.label}>{field.label}</span>
          {field.description && this.renderTooltip(field.description) }
        </div>
        <input type={this.inputs[field.type]} class={style.textInput} />
        { field.footnote && <p class={style.footnote}>{field.footnote}</p> }
      </div>
    );
  }

  renderImage(field) {
    return (
      <div class={style.field}>
        <div class={style.fieldLabel}>
          <span class={style.label}>{field.label}</span>
          {field.description && this.renderTooltip(field.description) }
        </div>
        <Button text="Add Image" buttonClass="secondary">
          <svg data-icon-name="PlusIcon" class="plus-icon icon" viewBox="0 0 16 16" style="transform: rotate(0deg);">
            <path d="M15,7 L9,7 L9,1 C9,0.4 8.6,0 8,0 C7.4,0 7,0.4 7,1 L7,7 L1,7 C0.4,7 0,7.4 0,8 C0,8.6 0.4,9 1,9 L7,9 L7,15 C7,15.6 7.4,16 8,16 C8.6,16 9,15.6 9,15 L9,9 L15,9 C15.6,9 16,8.6 16,8 C16,7.4 15.6,7 15,7 Z" />
          </svg>
        </Button>
        { field.footnote && <p class={style.footnote}>{field.footnote}</p> }
      </div>
    );
  }

  render({ group }) {
    return (
      <div class={style.group}>
        {/* Group Title */}
        <h5 class={style.title}>{group.title}</h5>
        <div class={style.groupFields}>
          {
            Object.keys(group.fields).map(fieldId => {
              const field = group.fields[fieldId];
              return this.types[field.type](field);
            })
          }
        </div>
      </div>
    );
  }
}