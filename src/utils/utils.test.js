import { h } from 'preact';
import { createNewGroup } from '.';

describe('Utilities functions', () => {
  describe('createNewGroup Function', () => {
    it('should return a newGroup with empty value properties', () => {
      const newGroup = createNewGroup();
      expect(newGroup._id.length).toBe(9);
      expect(newGroup.id).toBe('');
      expect(newGroup.title).toBe('');
      expect(newGroup.subtitle).toBe('');
      expect(newGroup.fields).toMatchObject({});
    });
  });

  describe('createNewField Function', () => {
    it('should return a newGroup with empty value properties', () => {
      const newField = createNewGroup('d5v1d86d2', 'unique-id');
      expect(newField._id.length).toBe(9);
      expect(newField._groupId).toBe('d5v1d86d2');
      expect(newField.id).toBe('');
      expect(newField.title).toBe('');
      expect(newField.subtitle).toBe('');
      expect(newField.fields).toMatchObject({});
    });
  });
});
