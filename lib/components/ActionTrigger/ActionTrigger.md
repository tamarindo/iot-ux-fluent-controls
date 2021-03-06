______________________________________________________________________________

### `ActionTrigger.props.attr`

```html
<ActionTrigger attr={...}>
    <div className='action-trigger' {...props.attr.container}>
        <Icon attr={props.attr.icon}>
            {props.label}
        </Icon>
        <Icon className='suffix' attr={props.attr.suffix} />
    </div>
</ActionTrigger>
```

______________________________________________________________________________

### Examples

#### Action Trigger

```jsx
<div>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' rightIcon='chevronDown4Legacy'/></a>
    <a href='#'><ActionTrigger icon='warning' label='Button Label' disabled /></a>
    <a href='#'><ActionTrigger icon='warning' label='This is a very long action trigger with too much text. This is a very long action trigger with too much text. This is a very long action trigger with too much text.'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
</div>
```