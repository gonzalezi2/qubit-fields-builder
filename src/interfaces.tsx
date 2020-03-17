export interface Group {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  fields: object;
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

export interface Value {
  _id: string;
  label: string;
  value: string;
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
