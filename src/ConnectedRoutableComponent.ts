import {ConnectedComponent} from 'react-rx-pure-connect'
import {RouteComponentProps} from 'react-router'

export interface ConnectedRoutableComponent<EP> extends ConnectedComponent<RouteComponentProps<EP>> {
}
