import { h, Component } from 'preact';
import Code from 'preact-prism';
import 'prismjs/themes/prism-okaidia.css';

import Header from './header';
import PreviewPane from './preview-pane';
import Button from './button';
import InputGroup from './input-group';

export default class App extends Component {

	state = {
    showPreview: false,    
    message: "",
	  fields: {
	    fields: [
	      {
	        key: 'title',
	        type: 'String',
	        label: 'Title',
	        groupId: 'options',
	        footnote: 'Works best when kept to less than 150 characters',
	        required: true,
	        description: 'Change the title of your banner'
	      },
	      {
	        key: 'image',
	        type: 'Image',
	        label: 'Image',
	        groupId: 'options',
	        required: true,
	        description: 'The banner image'
	      },
	      {
	        key: 'link',
	        type: 'URL',
	        label: 'Link',
	        groupId: 'options',
	        required: true,
	        description: 'Where your banner links to'
	      },
	      {
	        key: 'behaviour',
	        type: 'Boolean',
	        label: 'Open in new page',
	        groupId: 'options',
	        required: true,
	        description: 'If true, will open the link in a new page'
	      },
	      {
	        key: 'number',
	        type: 'Number',
	        label: 'Times',
	        groupId: 'options',
	        required: true,
	        description: 'The number of times you want to show the banner'
	      }
	    ],
	    groups: [
	      {
	        id: 'options',
	        title: 'Experience options',
	        subtitle: 'Local settings for your experience'
	      }
	    ]
    }
  }

	togglePreviewPane = () => {
	  this.setState(state => ({ showPreview: !state.showPreview }));
	}

	addInput = () => {
	  this.setState(state => {
	    state.fields.fields.push({
	      key: 'title',
	      type: 'String',
	      label: 'Title',
	      groupId: 'options',
	      footnote: 'Works best when kept to less than 150 characters',
	      required: true,
	      description: 'Change the title of your banner',
	      time: new Date()
	    });
	  });
  }
  
  addGroup = () => {
    this.setState(state => {
      state.fields.groups.push({
        id: 'options',
        title: 'Experience options',
        subtitle: 'Local settings for your experience'
      });
    });
  }

  callbackFunction = (childData) => {
    this.setState({ message: childData });
    console.log(this.state.message);
  }

  render() {
	  return (
	    <div id="app">
	      <Header />
	      <div className="header">
	        <div className="container">
	          <h1>New Fields File</h1>
	          <Button text="Preview" buttonClass="primary" clickHandler={this.togglePreviewPane} />
	        </div>
	      </div>

	      <div className="container">
	        {/* Grouped Fields */}
	        <div className="group-box">
            <div className="group-header">
              <h3>Groups</h3>
            </div>
            <div className="group-body">
              {
                this.state.fields.groups.map(group => (
                  <InputGroup
                    group={group}
                    state={this.state}
                    clickHandler={this.addInput}
                    parentCallback={this.callbackFunction}
                  />)
                )
              }
            </div>
            <div className="group-footer">
              <Button text="Add Group" buttonClass="secondary" clickHandler={this.addGroup} />
            </div>
	        </div>
	        <Code code={JSON.stringify(this.state.fields, undefined, 2)} language="javascript" />
	      </div>
	      {this.state.showPreview ? <PreviewPane options={this.state} handleClose={this.togglePreviewPane} /> : null}
	    </div>
	  );
  }
}
