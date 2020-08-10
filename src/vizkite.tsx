import React, { useRef, useEffect, useCallback } from 'react'




export interface D3CallbackType {
  (ref: SVGSVGElement, data: number[]): void;
}

export interface D3HookFunction {
  (
    d3Callback: D3CallbackType,
    data: number[]
  ): string | null;
}

export const useD3 = (d3Callback: D3CallbackType, data: number[]) => {
  
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    d3Callback(ref.current, data);
  }, []);

  return ref
}


export interface InterfaceD3SvgTarget {
  width: number;
  height: number;
  className: string;
}

export type Ref = SVGSVGElement


export const D3SvgTarget = (props) => (
    <svg 
      className={props.className}
      width={props.width}
      height={props.height}
      ref={props.forwardRef}
    />
);


export const D3SvgTargetWrapper = (props) => {

  const { d3Callback, data } = props;
  const forwardRef = useD3(d3Callback, data);

  return (
      <D3SvgTarget {...{...props, forwardRef: forwardRef}} /> 
  );
}

