import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { withRouter } from "react-router";
import ReactFacebookLogin from "react-facebook-login";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { login } from "../actions";
import { AuthState, LoginState } from '../model/AuthenticationState';

interface IFacebookResponse extends ReactFacebookLoginInfo {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

interface LoginPageParams {
  redirectPath: string;
}

interface LoginPageProps extends RouteComponentProps<LoginPageParams> {
  loggedIn: boolean,
  onFacebookResponse: (response: IFacebookResponse) => void;
}

class LoginPage extends React.Component<LoginPageProps, React.ComponentState> {
  constructor(props?: LoginPageProps) {
    super(props);
  }

  public componentDidReceiveProps(props?: LoginPageProps) {
    console.log("LoginPage: componentWillReceiveProps");
    if (props.loggedIn) {
      console.log("Redirecting because user is already logged in");
      props.history.push(props.match.params.redirectPath);
    }
  }

  public componentWillMount() {
    console.log("LoginPage: componentWillMount");
    console.log(this.props.loggedIn);
    if (this.props.loggedIn) {
      console.log("Redirecting because user is already logged in");
      console.log(this.props.match.params.redirectPath);
      console.log(this.props.history.location.search);
      this.props.history.push(this.props.match.params.redirectPath);
    }
  }
  
  public render(): JSX.Element {
    return (
      <div>
        <ReactFacebookLogin
          appId="1065804050218670"
          callback={this.props.onFacebookResponse.bind(this)}
        />
        <Link to="/app">App</Link>
      </div>
    );
  }
}

function mapStateToProps(state: AuthState): Partial<LoginPageProps> {
  return {
    loggedIn: true //state.auth.loginState === LoginState.LoggedIn
  };
}

function mapDispatchToProps(dispatch: Dispatch<AuthState>): Partial<LoginPageProps> {
  return {
    onFacebookResponse: (response: IFacebookResponse) => {
      dispatch(login("facebook", response.accessToken));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));