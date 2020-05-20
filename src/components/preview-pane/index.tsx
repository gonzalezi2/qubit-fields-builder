import { h } from "preact";
// import { Link } from 'preact-router/match';
import FieldPreview from "./field-preview";
import "./style.scss";
import { PreviewPaneProps } from "src/interfaces";

const PreviewPane = ({ groups, onClose }: PreviewPaneProps) => (
  <div>
    <div className="overlay" onClick={onClose} />
    <div class="previewPane">
      <div class="header">
        <h3>Edit experience content</h3>
        <svg
          onClick={onClose}
          data-icon-name="CloseIcon"
          class="closeIcon"
          viewBox="0 0 24 24"
          style="transform: rotate(0deg);"
        >
          <path d="M13.4142136,12 L18.7071068,17.2928932 C19.0976311,17.6834175 19.0976311,18.3165825 18.7071068,18.7071068 C18.3165825,19.0976311 17.6834175,19.0976311 17.2928932,18.7071068 L12,13.4142136 L6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L10.5857864,12 L5.29289322,6.70710678 C4.90236893,6.31658249 4.90236893,5.68341751 5.29289322,5.29289322 C5.68341751,4.90236893 6.31658249,4.90236893 6.70710678,5.29289322 L12,10.5857864 L17.2928932,5.29289322 C17.6834175,4.90236893 18.3165825,4.90236893 18.7071068,5.29289322 C19.0976311,5.68341751 19.0976311,6.31658249 18.7071068,6.70710678 L13.4142136,12 Z" />
        </svg>
      </div>
      <div class="body">
        {Object.keys(groups).map(groupId => (
          <FieldPreview key={groupId} group={groups[groupId]} />
        ))}
      </div>
    </div>
  </div>
);

export default PreviewPane;
