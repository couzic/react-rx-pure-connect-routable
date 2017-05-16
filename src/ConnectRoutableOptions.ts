import {ConnectOptions} from 'react-rx-pure-connect'
import {RouteComponentProps} from 'react-router'

export interface ConnectRoutableOptions<EP, IP> extends ConnectOptions<RouteComponentProps<EP>, IP> {
}
