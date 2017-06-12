import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { AuthState } from '../model/AuthenticationState';
import { Dispatch } from 'redux';
import { logout } from '../actions/index';

interface LogoutPageProps extends RouteComponentProps<null> {
  accessToken: string;
  loggedIn: boolean;
  redirectPath: string;
  onLogout: (accessToken: string) => void;
}

class LogoutPage extends React.Component<LogoutPageProps, {}> {
  public static defaultProps: Partial<LogoutPageProps> = {
    redirectPath: "/"
  }

  public componentWillReceiveProps(props?: LogoutPageProps) {
    this.checkAuthentication(props);
  }

  public componentWillMount() {
    this.checkAuthentication(this.props);
    this.props.onLogout(this.props.accessToken);
  }

  public render(): JSX.Element {
    return null;
  }

  private checkAuthentication(props: LogoutPageProps) {
    if (!props.loggedIn) {
      props.history.push(props.redirectPath);
    }
  }
}

function mapStateToProps(state: AuthState, ownProps: Partial<LogoutPageProps>): Partial<LogoutPageProps> {
  return {
    ...ownProps,
    accessToken: state.auth.accessToken,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AuthState>, ownProps: Partial<LogoutPageProps>): Partial<LogoutPageProps> {
  return {
    ...ownProps,
    onLogout: (accessToken: string) => {
      dispatch(logout(accessToken));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogoutPage));