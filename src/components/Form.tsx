import { forwardRef, ReactElement } from 'react';

export const Label = ({ children, ...props }) => (
  <label className="block mb-2 opacity-50" {...props}>
    {children}
  </label>
);

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (props: any, ref): ReactElement => (
    <>
      <Label htmlFor={props.name || props.id}>{props.label}</Label>
      <input
        className="bg-slate-600 rounded-md w-full border-0"
        ref={ref}
        {...props}
      />
    </>
  ),
);

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(
  (props: any, ref): ReactElement => (
    <>
      <Label htmlFor={props.name || props.id}>{props.label}</Label>
      <textarea
        className="bg-slate-600 rounded-md w-full border-0"
        ref={ref}
        {...props}
      />
    </>
  ),
);
