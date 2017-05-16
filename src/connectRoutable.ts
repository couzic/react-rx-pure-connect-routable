import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import {Observable} from 'rxjs'
import {connect, ConnectOptions, PropsMapper} from 'react-rx-pure-connect'
import {ConnectedRoutableComponent} from './ConnectedRoutableComponent'
import {ConnectRoutableOptions} from './ConnectRoutableOptions'

const extractProps = <EP>(f?: (externalProps: EP) => void) => f
   ? (routeProps: RouteComponentProps<EP>) => f!(routeProps.match.params)
   : () => null

function toRoutableOptions<EP, IP>(options?: Partial<ConnectOptions<EP, IP>>): Partial<ConnectRoutableOptions<EP, IP>> {
   if (!options) return {}
   else return {
      ...options,
      onExternalPropsChange: extractProps(options.onExternalPropsChange),
      componentWillMount: extractProps(options.componentWillMount),
      componentDidMount: extractProps(options.componentDidMount),
      componentWillReceiveExternalProps: extractProps(options.componentWillReceiveExternalProps),
      componentWillUnmount: options.componentWillUnmount
         ? (routeProps: RouteComponentProps<EP>, internalProps) => options.componentWillUnmount!(routeProps.match.params, internalProps)
         : () => null
   }
}

function toRoutePropsMapper<EP, IP>(propsMapper: PropsMapper<EP, IP>) {
   return (routeProps: RouteComponentProps<EP>) => propsMapper(routeProps.match.params)
}

export function connectRoutable<IP>(WrappedComponent: React.SFC<IP>) {
   return {
      to: <EP>(internalProps$: Observable<IP>, options?: Partial<ConnectOptions<EP, IP>>): ConnectedRoutableComponent<EP> => connect(WrappedComponent)
         .to(internalProps$, toRoutableOptions(options)),
      withMapper: <EP>(propsMapper: PropsMapper<EP, IP>, options?: Partial<ConnectOptions<EP, IP>>): ConnectedRoutableComponent<EP> => connect(WrappedComponent)
         .withMapper(toRoutePropsMapper(propsMapper), toRoutableOptions(options))
   }
}
