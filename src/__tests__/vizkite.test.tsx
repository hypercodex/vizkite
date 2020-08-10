import * as React from 'react'
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { shallow, mount } from 'enzyme';
import { useD3, D3SvgTarget, D3SvgTargetWrapper } from '../index';



describe("Test units of custom hook", () => {

  it("returns a undefined current node when called", () => {
    const { result } = renderHook(() => useD3(() => '', [1, 2, 3])); // Call our hook.
    expect(result.current.current).toBe(null);   
  });

  it("calls the callback", () => {
    const mockD3Callback = jest.fn((ref, data) => {return null;});
    const { result } = renderHook(() => useD3(mockD3Callback, [1, 2, 3])); // Call our hook.
    const svg = mount(
      <D3SvgTarget width={100} height={50} className='test' forwardRef={result.current[0]} />);
    expect(svg.text()).toBe("")
    expect(mockD3Callback).toBeCalled()
  });

  it("it renders a circle from fake callback", () => {
    const xmlns = 'http://ww3.w3.org/2000/svg';
    const d3Callback = (ref, data) => {
      if (ref !== null) {
        const childNode = document.createElementNS(xmlns, 'circle')
        ref.appendChild(childNode);
      }
    };
    const svg = mount(<D3SvgTargetWrapper width={100} height={50} className='test' d3Callback={d3Callback} data={[1, 2, 3]}/>);
    expect(svg.html()).toContain('circle')
  });

});


