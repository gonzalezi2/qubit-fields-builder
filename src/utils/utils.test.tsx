// import { h } from "preact";
import { getRandomId, createNewField, createNewGroup, createJSONCode, updateGroupId, updateLocalStorage } from ".";
import { AppState } from "../interfaces";

describe("Utilities functions", () => {
  describe("getRandomId Function", () => {
    const spy = jest.spyOn(global.Math, "random");
    beforeEach(() => {
      spy.mockReturnValue(0.9876543521);
    });
    afterEach(() => {
      spy.mockRestore();
    });
    it("should return a newGroup with empty value properties", () => {
      const newRandomId = getRandomId();
      expect(newRandomId.length).toBe(9);
      expect(newRandomId).toBe("zk001vq3c");
    });
  });
  describe("createNewGroup Function", () => {
    it("should return a newGroup with empty value properties", () => {
      const newGroup = createNewGroup();
      expect(newGroup._id.length).toBe(9);
      expect(newGroup.id).toBe("");
      expect(newGroup.title).toBe("");
      expect(newGroup.subtitle).toBe("");
      expect(newGroup.fields).toMatchObject({});
    });
  });

  describe("createNewField Function", () => {
    it("should return a newField with empty value properties", () => {
      const newField = createNewField("d5v1d86d2", "unique-id");
      expect(newField._id.length).toBe(9);
      expect(newField._groupId).toBe("d5v1d86d2");
      expect(newField.key).toBe("");
      expect(newField.type).toBe("String");
      expect(newField.label).toBe("");
      expect(newField.groupId).toBe("unique-id");
      expect(newField.footnote).toBe("");
      expect(newField.required).toBe(false);
      expect(newField.description).toBe("");
      expect(newField.constraints).toMatchObject({});
    });
  });

  // TODO write test to properly create the JSON code for adding and deleting constraints
  describe("createJSONCode Function", () => {
    const objectCode = {
      ix265qy0j: {
        _id: "ix265qy0j",
        id: "test",
        title: "Title",
        subtitle: "SubTitle",
        fields: {
          ud4h69noc: {
            _id: "ud4h69noc",
            _groupId: "ix265qy0j",
            key: "first-field",
            type: "URL",
            label: "Label",
            groupId: "test",
            footnote: "Footnote",
            required: true,
            description: "Description",
            constraints: {},
          },
        },
      },
    };
    const jsonCode = {
      groups: [
        {
          id: "test",
          title: "Title",
          subtitle: "SubTitle",
        },
      ],
      fields: [
        {
          key: "first-field",
          type: "URL",
          label: "Label",
          groupId: "test",
          footnote: "Footnote",
          required: true,
          description: "Description",
        },
      ],
    };
    it("should return a json object from the given object groups", () => {
      const newJSONCode = createJSONCode(objectCode);
      expect(newJSONCode).toMatchObject(jsonCode);
    });
  });

  describe("updateGroupId Function", () => {
    const oldGroup = {
      _id: "ix265qy0j",
      id: "updated-id",
      title: "Title",
      subtitle: "SubTitle",
      fields: {
        ud4h69noc: {
          _id: "ud4h69noc",
          _groupId: "ix265qy0j",
          key: "first-field",
          type: "URL",
          label: "Label",
          groupId: "old-id",
          footnote: "Footnote",
          required: true,
          description: "Description",
        },
      },
    };

    const updatedGroup = {
      _id: "ix265qy0j",
      id: "updated-id",
      title: "Title",
      subtitle: "SubTitle",
      fields: {
        ud4h69noc: {
          _id: "ud4h69noc",
          _groupId: "ix265qy0j",
          key: "first-field",
          type: "URL",
          label: "Label",
          groupId: "updated-id",
          footnote: "Footnote",
          required: true,
          description: "Description",
        },
      },
    };
    it("should return a group object with the fields having updated group-key values", () => {
      const newGroupObject = updateGroupId(oldGroup);
      expect(newGroupObject).toMatchObject(updatedGroup);
    });
  });

  describe("updateLocalStorage Function", () => {
    const objectCode = {
      ix265qy0j: {
        _id: "ix265qy0j",
        id: "test",
        title: "Title",
        subtitle: "SubTitle",
        fields: {
          ud4h69noc: {
            _id: "ud4h69noc",
            _groupId: "ix265qy0j",
            key: "first-field",
            type: "URL",
            label: "Label",
            groupId: "test",
            footnote: "Footnote",
            required: true,
            description: "Description",
          },
        },
      },
    };
    const state: AppState = {
      showPreview: false,
      groups: 1,
      fields: 1,
    };
    const localStorageValue = JSON.stringify({
      groups: objectCode,
      groupCount: state.groups,
      fieldsCount: state.fields,
    });
    it("should update the localStorage object with the correct values", () => {
      updateLocalStorage(objectCode, state);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith("store", localStorageValue);
    });
  });
});
