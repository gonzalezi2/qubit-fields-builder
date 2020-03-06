import { Group, Field, Constraint, ConstraintsJSON, Value, FieldsOutputJSON } from "../interfaces";

/**
 * Returns a random 9 character alphanumeric string
 * @return {string}
 */
function getRandomId(): string {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

/**
 * Returns a new group object
 * @function
 * @return {Group}
 */
export function createNewGroup(): Group {
  return {
    _id: getRandomId(),
    id: "",
    title: "",
    subtitle: "",
    fields: {},
  };
}

/**
 * Returns a new input field object
 * @function
 * @param {string} groupID - A random 9 character alphanumeric string id of the parent group
 * @param {string} groupKey - A string of the parent groupId from user input
 * @return {Field} field - The new field object
 */
export function createNewField(groupId: string, groupKey: string): Field {
  return {
    _id: getRandomId(),
    _groupId: groupId,
    key: "",
    type: "String",
    label: "",
    groupId: groupKey,
    footnote: "",
    required: false,
    description: "",
    constraints: {},
  };
}

/**
 * Returns a new constraint
 * @function
 * @return {Constraint} constraint - the new constraint object, defaults to maxLength
 */
export function createNewConstraint(): Constraint {
  return {
    _id: getRandomId(),
    type: "maxLength",
    value: 0,
  };
}

/**
 * Returns a new value
 * @function
 * @return {Value} value - the new value object
 */
export function createNewValue(): Value {
  return {
    _id: getRandomId(),
    label: "",
    value: "",
  };
}

/**
 * Converts constraints object into the correct JSON format as specified in the Qubit docs
 * @function
 * @param {Constraint} constraints - The constraints object that needs to be converted
 * @return {ConstraintsJSON} - A constraint object with just the necessary key:value pairs
 */
export function convertConstraintToJSON(constraint: Constraint): ConstraintsJSON {
  const newConstraint: ConstraintsJSON = { values: [] };
  for (const prop in constraint) {
    if (constraint[prop].type === "values") {
      const newValues = [];
      for (const valueId in constraint[prop].value) {
        const { _id, _constraintId, ...values } = constraint[prop].value[valueId];
        newValues.push(values);
      }
      newConstraint[constraint[prop].type] = newValues;
    } else {
      // Prevents a null value when switching from a 'values' constraint type to another
      // if (typeof constraints[prop].value === "array" || typeof constraints[prop].value === "object") {
      //   constraints[prop].value = 0;
      // }
      newConstraint[constraint[prop].type] = Number(constraint[prop].value || 0);
    }
  }
  return newConstraint;
}

/**
 * Separates fields from groups and returns an object with both,
 * removing any unnecessary properties not useful to the fields.json file
 * @function
 * @param {object} groups - The current groups object from memory
 * @return {FieldsJSON} - An object with groups and fields properties
 */
export function createJSONCode(groups: object): FieldsOutputJSON {
  const groupsArr = [];
  const fieldsArr = [];
  for (const prop in groups) {
    if (Object.prototype.hasOwnProperty.call(groups, prop)) {
      // eslint-disable-next-line no-unused-vars
      const { _id, fields, ...groupProps } = groups[prop];
      for (const prop in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, prop)) {
          // eslint-disable-next-line no-unused-vars
          const { _id, _groupId, _constraintId, ...fieldProps } = fields[prop];
          if (Object.keys(fieldProps.constraints).length > 0) {
            const newConstraints = convertConstraintToJSON(fieldProps.constraints);
            fieldProps.constraints = newConstraints;
          } else {
            delete fieldProps.constraints;
          }
          fieldsArr.push(fieldProps);
        }
      }
      groupsArr.push(groupProps);
    }
  }
  return {
    groups: groupsArr,
    fields: fieldsArr,
  };
}

/**
 * Updates the groupId of all fields in the group object with an updated id
 * @function
 * @param {Group} group - The group with the updated id
 * @return {Group} group - An updated group object with the updated fields property
 */
export function updateGroupId(group: Group): Group {
  const fieldKeys = Object.keys(group.fields);
  if (fieldKeys.length >= 1) {
    fieldKeys.map(fieldId => {
      // Check the group's fields to see if the groupId has changed and change the fields groupId to match
      if (group.fields[fieldId]._groupId === group._id && group.id !== group.fields[fieldId].groupId) {
        group.fields[fieldId].groupId = group.id;
      }
    });
  }
  return group;
}

interface AppState {
  showPreview: boolean;
  groups: number;
  fields: number;
}

/**
 * Updates the groups object stored in LocalStorage with the newest changes
 * Also updates the groups and fields counts
 * @function
 * @param { string: Group } groups - The new updated groups object to store
 * @param {object} state - The updated state with new groups and fields counts to store
 */
export function updateLocalStorage(groups: object, state: AppState) {
  localStorage.setItem(
    "store",
    JSON.stringify({
      groups,
      groupCount: state.groups,
      fieldsCount: state.fields,
    }),
  );
}
