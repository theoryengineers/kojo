// interface Fields {
//     teamName: string;
//     playerNumber: number;
// }

// export class LoginFormContainer extends Form<Fields> {}

// const 

// // {k: v} → {k: v} → {k: v}
// function merge(state, props) {
//     // tslint:disable-next-line:no-console
//     console.log(state);
//     // tslint:disable-next-line:no-console
//     console.log(props);
//     return state;
// }

// // A higher order component for modeling simple stateful forms. Type-checked with Typescript.
// import * as R from "ramda";
// import * as React from "react";
// import * as ReactDOM from "react-dom";

// // Props for the HOC, generic over the form fields specified by the passed in component.
// interface Props<FormFields> {
//   FormComponent: React.ComponentType<FormComponentProps<FormFields>>;
//   initialValues: FormFields;
// }

// // The on change handler type. This is extracted because it's too big to put inline in the Form class. Some
// // cool stuff going on here. The `<K extends keyof FormFields>` makes the function generic over all keys of
// // FormFields. Furthermore, the first argument must be a key that exists in FormFields, and the second
// // argument must be the type of the value specified for that key. You can't ever misspell a key by accident,
// // or pass an incorrect type for the value here.
// type OnChangeHandler<FormFields> = <K extends keyof FormFields>(
//   s: K,
//   a: FormFields[K]
// ) => void;

// // This just specifies the Handlers. Parameterized over FormFields like everything else.
// interface Handlers<FormFields> {
//   onChange: OnChangeHandler<FormFields>;
// }

// // The state of the Form component is just FormFields but wrapped in another object. This wrapping makes it
// // easier to type-check the setState calls.
// interface State<FormFields> {
//   fields: FormFields;
// }

// // Types are basically over, now for the meat of the class itself. First it's a generic class, which means
// // when you use it you need to specialize it by filling in the type for FormFields. I'll explain how this
// // works in detail later. Because it has a generic parameter that generic parameter is available throughout
// // the body of the class so you can use it in types there. The actual implementation of everything is pretty
// // straightforward.
// class Form<FormFields> extends React.Component<
//   Props<FormFields>,
//   State<FormFields>
// > {
  
//   constructor(props: Props<FormFields>) {
//     super(props);
//     this.state = { fields: props.initialValues };
//   }

//   public onChange: OnChangeHandler<FormFields> = (field, value) => {
//     this.setState({ fields: R.merge(this.state.fields, { [field]: value }) });
//   };

//   public render() {
//     const { FormComponent } = this.props;
//     const { fields } = this.state;

//     return <FormComponent onChange={this.onChange} fields={fields} />;
//   }
// }
// export default Form;

// // So down to usage. If you want to use this in a JSX expression you need to specialize it first. There's no
// // syntax in typescript to do this inline unfortunately but the actual method isn't too onerous. Basically
// // all you need to do is declare a new class that extends the Form class, specifying a type parameter for it.
// // First specify the form fields you want.
// interface SportsFields {
//   teamName: string;
//   playerNumber: number;
// };
  
// class SportsForm extends Form<SportsFields> {};

// // One thing you'll notice here is there's no need to add type annotations to any of the props. In fact I've
// // noticed that if you do add type annotations it confuses Typescript.
// {/* <SportsForm
//   initialValues={{ teamName: [], playerNumber: 0 }}
//   FormComponent={({ fields: { teamName, playerNumber }, onChange }) => (
//     <form>
//       <input type='text' value={teamName} onChange={(e) => onChange("teamName", e.target.value)} />
//     </form>
//   )}
//   /> */}

// // And that's it! Try to mispell those field names. Typescript won't let you, and you also can't mix up the
// // values passed to the onChange handler for each field name.