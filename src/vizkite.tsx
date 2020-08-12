import React, { useRef, useEffect } from 'react'



export type SVGRef = React.MutableRefObject<SVGSVGElement>

export type D3CallbackDataParameter = any[];

export interface D3CallbackType {
  (ref: SVGSVGElement, data: D3CallbackDataParameter): void;
}

export interface D3HookFunction {
  (
    d3Callback: D3CallbackType,
    data: D3CallbackDataParameter
  ): SVGRef | null;
}


export const useD3: D3HookFunction = (d3Callback, data) => {
  
  const ref = useRef(null) as React.MutableRefObject<SVGSVGElement>;
  useEffect(() => {
    d3Callback(ref.current, data);
  }, [data]);

  return ref
}



export interface D3SvgTargetBaseProps {
  className: string;
  width: number;
  height: number;
}

export interface D3SvgTargetProps extends D3SvgTargetBaseProps { 
  forwardRef: SVGRef;
}

export const D3SvgTarget = (props: D3SvgTargetProps): JSX.Element => (
    <svg 
      className={props.className}
      width={props.width}
      height={props.height}
      ref={props.forwardRef}
    />
);


export interface D3SvgProps extends D3SvgTargetBaseProps {
  d3Callback: D3CallbackType;
  data: D3CallbackDataParameter;
}

export const D3Svg = (props: D3SvgProps): JSX.Element => {
  const { 
    d3Callback,
    data,
    className,
    width,
    height 
  } = props;

  const forwardRef = useD3(d3Callback, data);

  return (
      <D3SvgTarget {...{...props, forwardRef: forwardRef}} /> 
  );
}

