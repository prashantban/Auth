// index.js
import React from 'react';
import { Link } from 'react-router';
import UserStore from '../stores/UserStore'
import { loginUser } from '../actions/UserActions';
import Auth from '../services/auth_service';

/** App Class
 */
class App extends React.Component {

  constructor() {
    super()
    this.state = this.getState();
    this.onChange = this.onChange.bind(this);
    this.navLinks = this.navLinks.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Check if Token is already set
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      loginUser(token, this.props.location.pathnames);
      this.onChange();
    }
  };

  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  };

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  };

  logout(e){
    Auth.logout();
  };

  /** Helper function to get the state
   * @return isUserLoggedIn, User Object
   */
    
  getState() {
    return {
      isLoggedIn: UserStore.getLoggedIn()
    };
  }


  onChange(){
    this.setState(this.getState());
  }

  navLinks() {
    if (!this.state.isLoggedIn) {
      return (
        <ul>
          <li>
            <Link to="login">Login</Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link onClick={this.logout.bind(this)}>Logout</Link>
          </li>
        </ul>
      )
    }
  }

  render() {

    return (

      <div className='App'>
        {this.navLinks()}
        {this.props.children}
      </div>
    );
  }
}

export default App;