import { h, Component } from 'preact';

export default class Store extends Component {
  getRandomId = () => Math.random().toString(36).substr(2, 9);
  addItem = (newItem) => this.state.items.push(newItem);
  getAllItems = () => this.state.items;
  
  constructor() {
    super();
    this.state = {
      items: [
        { sdvsdf415sd1: 'This is the very first object' }
      ]
    };
  }

}