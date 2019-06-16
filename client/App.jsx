import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store";

import Library from "./components/Library";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isFormActive: false
    }
  }
  toggleFormDisplay() {
    this.setState({
      isFormActive: !this.state.isFormActive
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Library />
      </Provider>
    );
  }
}

export default App;
