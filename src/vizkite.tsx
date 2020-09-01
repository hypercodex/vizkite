import React, { useRef, useEffect } from 'react'



export type TargetRef = React.MutableRefObject<HTMLDivElement>



export interface D3CallbackFunc<D, O> {
  (ref: HTMLDivElement, data: D, options?: O): void;
}

export interface D3HookFunction {
  <D, O>(
    d3Callback: D3CallbackFunc<D, O>,
    data: D,
    options?: O
  ): TargetRef;
}


export const useD3: D3HookFunction = (d3Callback, data, options) => {
  
  const ref = useRef(null) as TargetRef;
  useEffect(() => {
    d3Callback(ref.current, data, options);

    return () => {
      if (ref.current && ref.current.firstChild) {  
        ref.current.firstChild.remove();
      }
    }
  }, [data, ref.current]);

  return ref
}



export interface D3TargetBaseProps {
  className?: string;
}

export interface D3TargetProps extends D3TargetBaseProps { 
  forwardRef: TargetRef;
}


export const D3Target = (props: D3TargetProps): JSX.Element => (
    <div className={props.className} ref={props.forwardRef} ></div>
);


interface D3ContainerProps<D, O> extends D3TargetBaseProps {
  d3Callback: D3CallbackFunc<D, O>;
  data: D;
  options?: O;
}

export const D3Container = <T, O, P extends D3ContainerProps<T, O>>(props: P): JSX.Element => {
  const { 
    d3Callback,
    data,
    options
  } = props;

  const forwardRef = useD3(d3Callback, data, options);

  return (
      <D3Target {...{...props as P, forwardRef: forwardRef}} /> 
  );
}
