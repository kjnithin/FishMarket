import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {

  goToStore(e) {
    e.preventDefault();
    const url = this.storeInput.value;
    this.context.router.transitionTo(`/store/${url}`)
  }

  render() {
    {/*Form*/
    }
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please Enter the Store</h2>
        <input type='text' placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {
          this.storeInput = input
        }} required/>
        <button type='submit'>Visit Store</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
