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

  public componentWillReceiveProps(props?: LoginPageProps) {
    console.log("LoginPage: componentWillReceiveProps");
    this.checkAuthentication(props);
  }

  public componentWillMount() {
    this.checkAuthentication(this.props);
  }
  
  public render(): JSX.Element {
    return (
      <div>
        <ReactFacebookLogin
          appId="1065804050218670"
          callback={this.props.onFacebookResponse.bind(this)}
        />
      </div>
    );
  }

  private checkAuthentication(props: LoginPageProps) {
    if (props.loggedIn) {
      if (props.location.state && props.location.state.nextPathname) {
        props.history.push(props.location.state.nextPathname);
      }
      else {
        props.history.push("/");
      }
    }
  }
}

function mapStateToProps(state: AuthState): Partial<LoginPageProps> {
  return {
    loggedIn: state.auth.loginState === LoginState.LoggedIn
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