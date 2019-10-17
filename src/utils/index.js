/**
 * Returns a random 9 character alphanumeric string
 */
function getRandomId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

/**
 * Creates a new group object
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
 * Creates a new field object
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
