import { atom, selector, selectorFamily, SerializableParam, DefaultValue } from 'recoil';

export const headerMode = atom({
  key:'view/editMode',
  default: {view: true, edit: false}
})