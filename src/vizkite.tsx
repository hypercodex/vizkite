import React, { useRef, useLayoutEffect, useState } from 'react'
import useComponentSize from '@rehooks/component-size'
import 'resize-observer-polyfill'



export type TargetRef = React.MutableRefObject<HTMLDivElement>


// Basic Hook

export interface D3CallbackSignature<D, O> {
  (
    ref: TargetRef,
    data: D,
    options?: O
  ): void;
}

export interface D3Callback {
  <D, O>(
    ref: TargetRef,
    data: D,
    options?: O
  ): void;
}

export interface D3HookFunction {
  <D, O>(
    d3Callback: D3CallbackSignature<D, O>,
    data: D,
    options?: O
  ): TargetRef;
}


export const useD3: D3HookFunction = (d3Callback, data, options) => {
  const ref = useRef(null) as TargetRef;
  useLayoutEffect(() => {
    d3Callback(ref, data, options);
    return () => {
      if (ref.current && ref.current.firstChild) {  
        ref.current.firstChild.remove();
      }
    }
  }, [data, ref, options]);
  return ref
}

// Responsive Hook

export interface D3ResponsiveCallbackSignature<D, O> {
  (
    ref: TargetRef,
    data: D,
    size: { width: number, height: number; },
    update: boolean,
    options?: O
  ): void;
}

export interface D3ResponsiveCallback {
  <D, O>(
    ref: TargetRef,
    data: D,
    size: { width: number, height: number; },
    update: boolean,
    options?: O
  ): void;
}

export interface D3ResponsiveHookFunction {
  <D, O>(
    d3Callback: D3ResponsiveCallbackSignature<D, O>,
    data: D,
    options?: O
  ): TargetRef;
}

export const useD3Responsive: D3ResponsiveHookFunction = (d3Callback, data, options) => {
  const ref = useRef(null) as TargetRef;
  const size = useComponentSize(ref);
  const [update, setUpdate] = useState(0);  
  const shouldUpdate = update > 2 ? true : false;
  useLayoutEffect(() => {
    d3Callback(ref, data, size, shouldUpdate, options);
    setUpdate(update + 1);
    return () => {
      if (ref.current && ref.current.firstChild) {  
        ref.current.firstChild.remove();
      }
    }
  }, [shouldUpdate, data, ref, options, size]);
  return ref
}

// Target (root of DOM manipulations)

export interface D3TargetBaseProps {
  id: string;
  className?: string;
}

export interface D3TargetProps extends D3TargetBaseProps { 
  forwardRef: TargetRef;
}


export const D3Target = (props: D3TargetProps): JSX.Element => (
    <div id={props.id} className={props.className} ref={props.forwardRef} ></div>
);

// Basic Hook Container

interface D3ContainerProps<D, O> extends D3TargetBaseProps {
  d3Callback: D3CallbackSignature<D, O>;
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
};

interface D3ResponsiveContainerProps<D, O> extends D3TargetBaseProps {
  d3Callback: D3ResponsiveCallbackSignature<D, O>;
  data: D;
  options?: O;
}


export const D3ResponsiveContainer = <T, O, P extends D3ResponsiveContainerProps<T, O>>(props: P): JSX.Element => {

  const { 
    d3Callback,
    data,
    options
  } = props;

  const forwardRef = useD3Responsive(d3Callback, data, options);

  return (
    <D3Target {...{...props as P, forwardRef: forwardRef}} /> 
  );
};

/* // Responsive Hook Container */


