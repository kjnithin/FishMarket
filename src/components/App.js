import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import base from '../base';
import loadSampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor(){
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.state = {
      fishes : {},
      order : {}
    };
  };

   componentWillMount(){
     this.ref = base.syncState(`${this.props.params.storeid}/fishes`,{
       context:this,
       state:'fishes'
     });
   };

   componentWillUnmount(){
     base.removeBinding(this.ref);
   };

  addFish(fish){
      let fishes = {...this.state.fishes};
      fishes=fish;
      this.setState({fishes});
  }

  addOrder(key){
    const order = {...this.state.order};
    order[key] = order[key]+1 || 1;
    this.setState({order});
  }

  loadSamples(){
    this.setState({fishes:loadSampleFishes});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='catch-of-the-day'/>
          <ul className='list-of-fishes'>
            {Object
              .keys(this.state.fishes)
              .map(key =>  <Fish key={key} index={key} details={this.state.fishes[key]} addOrder={this.addOrder} />)
            }

          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
};

export default App;
