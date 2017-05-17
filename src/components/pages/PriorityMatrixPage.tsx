import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { ConnectedPriorityMatrix } from '../PriorityMatrix';

export class PriorityMatrixPage extends React.Component<RouteComponentProps<null>, {}> {
  public render(): JSX.Element {
    return (
      <ConnectedPriorityMatrix/>
    );
  }
}