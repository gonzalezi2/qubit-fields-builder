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
    description: ''
  };
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
          const { _id, _groupId, ...fieldProps } = fields[prop];
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
