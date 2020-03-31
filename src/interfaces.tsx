export interface Group {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  fields: object;
}

export interface GroupProps {
  saveGroup: (group: Group) => void;
  deleteGroup: (groupId: string) => void;
  addField: (_id: string, id: string) => void;
  group: Group;
  key: string;
  deleteField: (groupId: string, fieldId: string) => void;
  addConstraints: (groupId: string, fieldId: string) => void;
}

export type FieldTypes = "String" | "StringArray" | "Image" | "URL" | "Number" | "Boolean" | "TimeRange" | "Duration";

export interface Field {
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
}

export interface Constraint {
  _id: string;
  type: "minLength" | "maxLength" | "values";
  value: number | object;
}

export interface ConstraintProps {
  constraint: Constraint;
  key: string;
  type: FieldTypes;
  saveConstraint: (id: string, constraint: Constraint) => void;
  deleteConstraint: (constraintID: string) => void;
}

export interface Value {
  _id: string;
  label: string;
  value: string;
}

export interface FieldProps {
  deleteField: (groupId: string, fieldId: string) => void;
  addConstraints: (groupId: string, fieldId: string) => void;
  saveConstraint: (fieldID: string, constraintID: string, constraint: Constraint) => void;
  deleteConstraint: (fieldID: string, constraintID: string) => void;
  saveField: (fieldID: string, field: object) => void;
  key: string;
  field: Field;
}

export interface GroupsJSON {
  id: string;
  title: string;
  subtitle: string;
}

export interface ValuesJSON {
  label: string;
  value: string;
}

export interface ConstraintsJSON {
  values: Array<ValuesJSON>;
}

export interface FieldsJSON {
  key: string;
  type: "String" | "StringArray" | "Image" | "URL" | "Number" | "Boolean" | "TimeRange" | "Duration";
  label: string;
  groupId: string;
  footnote: string;
  required: boolean;
  description: string;
  constraints?: ConstraintsJSON;
}

export interface FieldsOutputJSON {
  groups: Array<GroupsJSON>;
  fields: Array<FieldsJSON>;
}
