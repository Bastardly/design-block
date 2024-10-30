# Disclaimer

Still Work in progress!


# What is a Design Block?
Imagine that you could make custom HTMLDivElement, but instead of a huge bundle of css-classes to define spacing, you use attributes. But these attributes are locked to given values, limiting margins or padding to values like "zero", "xs", "sm", "md", "lg", "xl" or "xxl". This will make your design pattern a lot more consistant, while being extremely easy to work with.

# Installation
Installation is fairly simple using [Node's](https://nodejs.org) package manager.

In your console, run:

```
npm install @flemminghansen/design-block
```


# Usage
Since Design Block is a custom element, you'll need to define it first at the root of your app or module. If you are using SSR, you can define the custom component in an accompanied js file to your render.

```JavaScript
import { DesignBlock, define } from "@flemminghansen/design-block";

define('element-name', DesignBlock);
```

"element-name" can be anything, as long as it starts with a lowercase letter and contains a hyphen. You can read more about defining names on custom elements here: [valid-custom-element-name](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)

Once a valid name is defined, you can then use the custom component as such:

```HTML
<element-name p="sm" ml="xxl">Hello world!</element-name>
```

But! Currently, we haven't defined the values of the attributes. We do that with css variables.

```CSS
    :root {
        --xs: 2px; 
        --sm: 4px; 
        --md: 6px; 
        --lg: 12px; 
        --xl: 20px; 
        --xxl: 40px; 
    }
```

