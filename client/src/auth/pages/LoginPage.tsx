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

interface LoginPageProps extends RouteComponentProps<null> {
  defaultRedirectPath: string;
  facebookAppId: string;
  loggedIn: boolean,
  onFacebookResponse: (response: IFacebookResponse) => void;
}

class LoginPage extends React.Component<LoginPageProps, React.ComponentState> {
  public static defaultProps: Partial<LoginPageProps> = {
    loggedIn: false,
    defaultRedirectPath: "/"
  }

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
          appId={this.props.facebookAppId}
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
        props.history.push(props.defaultRedirectPath);
      }
    }
  }
}

function mapStateToProps(state: AuthState, ownProps: Partial<LoginPageProps>): Partial<LoginPageProps> {
  return {
    ...ownProps,
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