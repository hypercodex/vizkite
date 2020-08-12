# VisKite
Visualization package leveraging React Hooks to run DOM manipulation side-effects such as D3.

### Why
You want to use a stateful DOM manipulation library like D3 within React. You want to do this using the Hooks approach. You want to avoid having the boilerplate of extracting the stateful logic into a custom Hook everytime you want to render a data driven document. You want this functionality to be modular and in Typescript.

### How
This package uses a combination of useRef and useEffect closed on by a HOC for a component that returns a SVGElement. The svg is rendered in React and can be manipulated by passing a callback that uses a library such as D3 to perform DOM mutations.

### Installation
`yarn add "@hypercodex/vizkite"`

### Examples
This module exports a React component `D3Svg` that will render a `<svg ... />` that is rendered via the callback prop `d3Callback` and a `data` that is the available to the callback as an argument. 
The callback has the following signature:

```typescript
export interface D3CallbackType {
  (ref: React.MutableRefObject<SVGSVGElement>, data: any[]): void;
}
```

#### An example using a simple D3 callback:

The callback takes two parameters, the first being a reference to the dom element targeted for manipulation and the second being the data to update the DOM with. 

```javascript

const d3Callback = (ref, data) => {
  const svg = d3.select(ref);

  // Bind D3 data
  const update = svg
      .append('g')
      .selectAll('text')
      .data(data);

  // Enter new D3 elements
  update.enter()
      .append('text')
      .attr('x', (d, i) => i * 30)
      .attr('y', 50)
      .style('font-size', 30)
      .style('fill', 'green')
      .text((d: number) => d);

  // Update existing D3 elements
  update
      .attr('x', (d, i) => i * 30)
      .text((d: number) => d);

  // Remove old D3 elements
  update.exit()
      .remove();
}
```

The callback can be passed to the D3Svg component with our custom component `Viz` like so:
```typescript

const Viz = ({d3Callback, data}) => 
  <D3Svg
   width={200}
   height={50}
   className='test'
   d3Callback={d3Callback}
   data={data}
  />;

...

ReactDOM.render(<Viz d3Callback={d3Callback} data={[1, 2, 3, 4]} />, document.getElementById('root'));
```

#### Renders: 
![Example output](https://github.com/hypercodex/vizkite/blob/master/img/vizkite_example.png)

Pretty sweet!




## Issues
If you find a bug or want to suggest an enhancement please feel free to open a PR.

:)


## LICENSE
MIT

