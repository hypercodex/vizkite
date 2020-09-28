import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { useD3, D3Container, D3Target } from '../index';



describe('Test units of custom hook', () => {

  // This rudimentary callback mutates the DOM 
  const d3Callback = (ref, data) => {
    const xmlns = 'http://ww3.w3.org/2000/svg';
    if (ref !== null) {
      const childNode = document.createElementNS(xmlns, 'circle')
      ref.current.appendChild(childNode);
    }
  };

  it('returns a undefined current node when called', () => {
    const { result } = renderHook(() => useD3(() => '', [])); // Call our hook.
    expect(result.current.current).toBe(null);   
  });

  it('calls the callback', () => {
    const mockD3Callback = jest.fn((ref, data) => {return null;});
    const { result } = renderHook(() => useD3(mockD3Callback, [])); // Call our hook.
    const svg = mount(
      <D3Target  id='test' className='test' forwardRef={result.current[0]} />);
    expect(svg.text()).toBe('')
    expect(mockD3Callback).toBeCalled()
  });

  it('calls the effect cleanup', () => {
    const TestComponent = () => {
      const ref = useD3(d3Callback, []); // Call our hook.
      return <D3Target  id='test' className='test' forwardRef={ref} />;
    }
    const { container, unmount } = render(
      <TestComponent />
    );
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelectorAll('circle')).toHaveLength(1);
    unmount();
    expect(container.querySelectorAll('circle')).toHaveLength(0);
  });

  it('it renders a circle from fake callback', () => {
    const svg = mount(
      <D3Container
      id='test'
      className='test'
      d3Callback={d3Callback}
      data={[]}
      />
    );
    expect(svg.html()).toContain('circle')
  });
});


