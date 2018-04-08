// /* variation on https://medium.com/@DanHomola/react-higher-order-components-in-typescript-made-simple-6f9b55691af1 */
// import * as React from 'react'
// import { wrapDisplayName } from 'recompose'

// // Props you want the resulting component to take (besides the props of the wrapped component)
// interface ExternalProps {}

// // Props the HOC adds to the wrapped component
// export interface InjectedProps {}

// // Options for the HOC factory that are not dependent on props values
// interface Options {
//   key?: string
// }

// const hoc = ({ key = 'Default value' }: Options = {}) => <OriginalProps extends {}>(
//   Component: React.ComponentType<OriginalProps & InjectedProps>,
// ) => {
//   class HOC extends React.Component<OriginalProps & ExternalProps> {
//     render() {
//       return <div />
//     }
//   }

//   if (process.env.NODE_ENV !== 'production') {
//     (HOC as any).displayName = wrapDisplayName(Component, 'hoc')
//   }

//   return HOC
// }

// export default hoc

// interface WithBlueBackgroundProps {
//     style?: React.CSSProperties;
// }

// // function withBlueBackgroundFunction<P extends WithBlueBackgroundProps>(
// //     UnwrappedComponent: React.ComponentType<P>
// //   ) { 
// //     return class WithBlueBackground extends React.Component<P> {
// //       ...
// //     }
// //   }

// const withBlueBackground = <P extends WithBlueBackgroundProps> (
//     UnwrappedComponent: React.ComponentType<P>
// ) =>
//     class WithBlueBackground extends React.Component<P> {
//         render() {
//             return (
//                 <UnwrappedComponent
//                     {...this.props}
//                     // Cant use spread here because of TS issue, see TypeScript #10727 #13288
//                     // tslint:disable-next-line:prefer-object-spread
//                     style={Object.assign({}, this.props.style, {
//                         backgroundColor: 'yellow',
//                     })}
//                 />
//             );
//         }
//     };
