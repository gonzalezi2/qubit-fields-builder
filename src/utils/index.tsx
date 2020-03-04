/**
 * Returns a random 9 character alphanumeric string
 * @return {string}
 */
function getRandomId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

/**
 * Returns a new group object
 * @function
 * @return {object}
 */
export function createNewGroup() {
  return {
    _id: getRandomId(),
    id: '',
    title: '',
    subtitle: '',
    fields: {}
  };
}

/**
 * Returns a new input field object
 * @function
 * @param {string} - A random 9 character alphanumeric string id of the parent group
 * @param {string} - A string of the parent groupId from user input
 * @return {object} field - The new field object
 */
export function createNewField(groupId, groupKey) {
  return {
    _id: getRandomId(),
    _groupId: groupId,
    key: '',
    type: 'String',
    label: '',
    groupId: groupKey,
    footnote: '',
    required: false,
    description: '',
    constraints: {}
  };
}

/**
 * Returns a new constraint
 * @function
 * @return {object} constraint - the new constraint object
 */
export function createNewConstraint() {
  return {
    _id: getRandomId(),
    type: 'maxLength',
    value: 0
  }
}

/**
 * Returns a new value
 * @function
 * @return {object} value - the new value object
 */
export function createNewValue() {
  return {
    _id: getRandomId(),
    label: '',
    value: ''
  }
}

/**
 * Separates fields from groups and returns an object with both,
 * removing any unnecessary properties not useful to the fields.json file
 * @function
 * @param {object} groups - The current groups object from memory
 * @return {object} - An object with groups and fields properties
 */
export function createJSONCode(groups) {
  let groupsArr = [];
  let fieldsArr = [];
  for (const prop in groups) {
    if (groups.hasOwnProperty(prop)) {
      // eslint-disable-next-line no-unused-vars
      const { _id, fields, ...groupProps } = groups[prop];
      for (const prop in fields) {
        if (fields.hasOwnProperty(prop)) {
          // eslint-disable-next-line no-unused-vars
          const { _id, _groupId, _constraintId, ...fieldProps } = fields[prop];
          if(Object.keys(fieldProps.constraints).length > 0) {
            const newConstraints = convertConstraintToJSON(fieldProps.constraints);
            fieldProps['constraints'] = newConstraints;
          } else {
            delete fieldProps['constraints'];
          }
          fieldsArr.push(fieldProps);
        }
      }
      groupsArr.push(groupProps);
    }
  }
  return {
    groups: groupsArr,
    fields: fieldsArr
  };
}

/**
 * Converts constraints object into the correct JSON format as specified in the Qubit docs
 * @function
 * @param {object} constraints - The constraints object that needs to be converted
 * @return {object} - A constraint object with just the necessary key:value pairs
 */
export function convertConstraintToJSON(constraints) {
  let newConstraints = {};
  for(const prop in constraints) {
    if(constraints[prop].type === 'values') {
      let newValues = [];
      for(const valueId in constraints[prop].value) {
        const {_id, _constraintId, ...values} = constraints[prop].value[valueId];
        newValues.push(values);
      }
      newConstraints[constraints[prop].type] = newValues;
    } else {
      // Prevents a null value when switching from a 'values' constraint type to another
      if(typeof constraints[prop].value === 'array' || typeof constraints[prop].value === 'object') {
        constraints[prop].value = 0;
      }
      newConstraints[constraints[prop].type] = Number(constraints[prop].value);
    }
  }
  return newConstraints;
}

/**
 * Updates the groupId of all fields in the group object with an updated id
 * @function
 * @param {object} group - The group with the updated id
 * @return {object} - An updated group object with the updated fields property
 */
export function updateGroupId(group) {
  const fieldKeys = Object.keys(group.fields);
  if (fieldKeys.length >= 1) {
    fieldKeys.map(fieldId => {
      // Check the group's fields to see if the groupId has changed and change the fields groupId to match
      if (
        group.fields[fieldId]._groupId === group._id &&
        group.id !== group.fields[fieldId].groupId
      ) {
        group.fields[fieldId].groupId = group.id;
      }
    });
  }
  return group;
}

/**
 * Updates the groups object stored in LocalStorage with the newest changes
 * Also updates the groups and fields counts
 * @function
 * @param {object} groups - The new updated groups object to store
 * @param {object} state - The updated state with new groups and fields counts to store
 */
export function updateLocalStorage(groups, state) {
  localStorage.setItem(
    'store',
    JSON.stringify({
      groups,
      groupCount: state.groups,
      fieldsCount: state.fields
    })
  );
}
