import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AuthState, LoginState } from '../model/AuthenticationState';
import { connect } from 'react-redux';

interface AuthenticatedContainerProps extends RouteComponentProps<null> {
  isLoggedIn: boolean;
  loginPath?: string;
}

class AuthenticatedContainer extends React.Component<AuthenticatedContainerProps, {}> {
  public static defaultProps: Partial<AuthenticatedContainerProps> = {
    loginPath: "/login"
  }
  
  public componentWillMount() {
    this.checkAuthentication(this.props);
  }
  
  public componentWillReceiveProps(nextProps: AuthenticatedContainerProps) {
    if (nextProps.location !== this.props.location) {
      this.checkAuthentication(nextProps);
    }
  }

  public render(): JSX.Element {
    if (this.props.isLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    else {
      return null;
    }
  }

  private checkAuthentication(props: AuthenticatedContainerProps) {
    const { history } = props;
    if (!props.isLoggedIn) {
      history.replace({ pathname: props.loginPath, state: { nextPathname: props.location.pathname }});
    }
  }
}

function mapStateToProps<S extends AuthState>(state: S, ownProps: Partial<AuthenticatedContainerProps>): Partial<AuthenticatedContainerProps> {
  return {
    ...ownProps,
    isLoggedIn: !(state.auth.loginState === LoginState.NotLoggedIn)
  };
}

export default connect(mapStateToProps)(withRouter(AuthenticatedContainer));