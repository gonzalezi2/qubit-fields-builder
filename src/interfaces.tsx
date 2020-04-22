import { h } from "preact";

export type AppState = {
  showPreview: boolean;
  groups: number;
  fields: number;
};

export type Group = {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  fields: object;
};

export type GroupProps = {
  saveGroup: (group: Group) => void;
  deleteGroup: (groupId: string) => void;
  addField: (_id: string, id: string) => void;
  group: Group;
  key: string;
  deleteField: (groupId: string, fieldId: string) => void;
  addConstraints: (groupId: string, fieldId: string) => void;
};

export type FieldTypes = "String" | "StringArray" | "Image" | "URL" | "Number" | "Boolean" | "TimeRange" | "Duration";

export type Field = {
  _id: string;
  _groupId: string;
  key: string;
  type: FieldTypes;
  label: string;
  groupId: string;
  footnote: string;
  required: boolean;
  description: string;
  constraints: object;
  _constraintId?: string;
};

export type Constraint = {
  _id: string;
  type: "minLength" | "maxLength" | "values";
  value: number | object;
};

export type ConstraintProps = {
  constraint: Constraint;
  key: string;
  type: FieldTypes;
  saveConstraint: (id: string, constraint: Constraint) => void;
  deleteConstraint: (constraintID: string) => void;
};

export type Value = {
  _id: string;
  label: string;
  value: string;
};

export type ValueProps = {
  value: Value;
  deleteValue: (valueId: string) => void;
  saveValue: (valueId: string, value: Value) => void;
  fieldType: FieldTypes;
  className: string;
};

export type FieldProps = {
  deleteField: (groupId: string, fieldId: string) => void;
  addConstraints: (groupId: string, fieldId: string) => void;
  saveConstraint: (fieldID: string, constraintID: string, constraint: Constraint) => void;
  deleteConstraint: (fieldID: string, constraintID: string) => void;
  saveField: (fieldID: string, field: object) => void;
  key: string;
  field: Field;
};

export type GroupsJSON = {
  id: string;
  title: string;
  subtitle: string;
};

export type ValuesJSON = {
  label: string;
  value: string;
};

export type ConstraintsJSON = {
  values: Array<ValuesJSON>;
};

export type FieldsJSON = {
  key: string;
  type: "String" | "StringArray" | "Image" | "URL" | "Number" | "Boolean" | "TimeRange" | "Duration";
  label: string;
  groupId: string;
  footnote: string;
  required: boolean;
  description: string;
  constraints?: ConstraintsJSON;
};

export type FieldsOutputJSON = {
  groups: Array<GroupsJSON>;
  fields: Array<FieldsJSON>;
};

export type ButtonProps = {
  text: string;
  buttonClass: string;
  clickHandler: () => void;
  children?: string | h.JSX.Element;
};

export type PreviewPaneProps = {
  groups: object;
  handleClose: () => void;
};
