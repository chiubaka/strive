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

interface LoginPageStateProps {
  loggedIn: boolean;
}

interface LoginPageDispatchProps {
  onFacebookResponse: (response: IFacebookResponse) => void;
}

interface LoginPageOwnProps {
  defaultRedirectPath: string;
  facebookAppId: string;
  logoPath: string;
}

declare type LoginPageProps = RouteComponentProps<any> & LoginPageStateProps & LoginPageDispatchProps 
  & LoginPageOwnProps;

class LoginPage extends React.Component<LoginPageProps, React.ComponentState> {
  public static defaultProps: Partial<LoginPageProps> = {
    loggedIn: false,
    defaultRedirectPath: "/"
  }

  constructor(props?: LoginPageProps) {
    super(props);
  }

  public componentWillReceiveProps(props?: LoginPageProps) {
    this.checkAuthentication(props);
  }

  public componentWillMount() {
    this.checkAuthentication(this.props);
  }
  
  public render(): JSX.Element {
    return (
      <div className="login-page">
        <div className="horizontal-center vertical-center">
          <div className="content">
            <img
              className="logo"
              src={this.props.logoPath}
            />
            <ReactFacebookLogin
              appId={this.props.facebookAppId}
              callback={this.props.onFacebookResponse.bind(this)}
            />
          </div>
        </div>
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

function mapStateToProps(state: AuthState): LoginPageStateProps {
  return {
    loggedIn: state.auth.loginState === LoginState.LoggedIn
  };
}

function mapDispatchToProps(dispatch: Dispatch<AuthState>): LoginPageDispatchProps {
  return {
    onFacebookResponse: (response: IFacebookResponse) => {
      dispatch(login("facebook", response.accessToken));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter<LoginPageOwnProps>(LoginPage));