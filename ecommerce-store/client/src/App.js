import React, { Component } from 'react';
import axios from 'axios';



class App extends Component {
  componentDidMount(){
    axios.get('/api/product/brands').then(res => {
      console.log(res);
    })
  }
  render() {
    return (
      <div className="App">
        My App
      </div>
    );
  }
}

export default App;
