______________________________________________________________________________

### `PivotMenu.props.attr`

```html
<PivotMenu attr={...}>
    <div className='pivot-menu' {...props.attr.container}>
        <a className='pivot' {...props.attr.anchor}>
            <Pivot attr={props.attr.pivot} />
        </a>
        ...
        <a className='pivot' {...props.attr.anchor}>
            <Pivot attr={props.attr.pivot} />            
        </a>
    </div>
</PivotMenu>
```

______________________________________________________________________________

### Examples
```jsx
const initialState = {value: '1'};
const pivot = (num) => {
    return {
        label: `PivotMenu #${num}`,
        key: `${num}`,
        icon: 'info',
        href: `#/!Page${num}`,
        title: `Title for PivotMenu #${num}`,
        onClick: (event) => {
            setState({value: `${num}`});
            event.preventDefault();
        }
    };
};

<PivotMenu
    links={[
        pivot(0),
        pivot(1),
        pivot(2),
        pivot(3),
        pivot(4)
    ]}
    active={state.value}
/>
```