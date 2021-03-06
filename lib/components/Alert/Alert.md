______________________________________________________________________________

### `Alert.props.attr`

```html
<Alert attr={...}>
    <div className='alert' {...props.attr.container}>
        <Icon classname='icon' attr={props.attr.icon}/>
        <div className='text' {...props.attr.contents}>
            {props.children}
        </div>
        <Icon className='close' attr={props.attr.closeIcon} />
    </div>
</Alert>
```

______________________________________________________________________________

### Examples

#### Information Alert

```jsx
let onClose = () => alert('Alert close button pushed!');
<Alert icon='info' type={0} onClose={onClose} attr={{closeButtonTitle: 'dismiss'}}>This is an information alert!</Alert>
```

#### Warning Alert

```jsx
let onClose = () => alert('Alert close button pushed!');
<Alert icon='warning' type={1} onClose={onClose} attr={{closeButtonTitle: 'dismiss'}}>This is a warning alert!</Alert>
```

#### Error Alert

```jsx
<Alert icon='error' type={2}>This is an error alert!</Alert>
```

#### With close button and text overflow

```jsx
let onClose = () => alert('Alert close button pushed!');
<Alert icon='error' type={2} onClose={onClose} attr={{closeButtonTitle: 'dismiss'}}>This is an error alert with a close button! pp This is an error alert with a close button! This is an error alert with a close button! This is an error alert with a close button!</Alert>
```

```jsx
<Alert icon='info' type={0} multiline>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur eros nec arcu vulputate placerat. Mauris porta consectetur eros, id vehicula ligula tempus at. Pellentesque sed velit nisl. Pellentesque efficitur orci ultrices dui condimentum venenatis. Pellentesque risus tortor, mollis tincidunt euismod in, rutrum et nisl. Praesent tincidunt metus justo, tempus tincidunt nisi facilisis ac. Praesent a metus nec urna viverra ultrices id sed arcu.</Alert>
```

#### Fixed width Alert

```jsx
<Alert icon='warning' type={1} fixed>This is a fixed alert! This is a fixed alert! This is a fixed alert!</Alert>
```