import React, { useRef, useEffect } from 'react'



export type TargetRef = React.MutableRefObject<HTMLDivElement>

export type D3CallbackDataParameter = any[];


export interface D3CallbackType {
  (ref: HTMLDivElement, data: D3CallbackDataParameter): void;
}


export interface D3HookFunction {
  (
    d3Callback: D3CallbackType,
    data: D3CallbackDataParameter
  ): React.MutableRefObject<HTMLDivElement>;
}


export const useD3: D3HookFunction = (d3Callback, data) => {
  
  const ref = useRef(null) as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    d3Callback(ref.current, data);

    return () => {
      if (ref.current && ref.current.firstChild) {  
        ref.current.firstChild.remove();
      }
    }
  }, [data, ref.current]);

  return ref
}



export interface D3TargetBaseProps {
  className: string;
}

export interface D3TargetProps extends D3TargetBaseProps { 
  forwardRef: TargetRef;
}


export const D3Target = (props: D3TargetProps): JSX.Element => (
    <div className={props.className} ref={props.forwardRef} ></div>
);


export interface D3Props extends D3TargetBaseProps {
  d3Callback: D3CallbackType;
  data: D3CallbackDataParameter;
}

export const D3Container = (props: D3Props): JSX.Element => {
  const { 
    d3Callback,
    data,
  } = props;

  const forwardRef = useD3(d3Callback, data);

  return (
      <D3Target {...{...props, forwardRef: forwardRef}} /> 
  );
}




