// import * as React from 'react';

// interface InjectedProps {
//     style?: React.CSSProperties;
// }

// export default function Authorized<P extends InjectedProps> (
//         UnwrappedComponent: React.ComponentType<P>
//     ) {
//     return class Authorization extends React.Component<P> {
//         render() {
//             if (auth.isAuthenticated()) {
//                 // Cant use spread here because of TS issue, see TypeScript #10727 #13288
//                 // tslint:disable-next-line:prefer-object-spread
//                 return <UnwrappedComponent {...this.props} />;
//             } else {
//                 return <LogIn/>;
//             }
//         }
//     };
// }

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
