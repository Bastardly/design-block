# What is a Design Block?
Imagine that you could make custom HTMLDivElement, but instead of a huge bundle of css-classes to define spacing, you use attributes. But these attributes are locked to given values, limiting margins or padding to values like "zero", "xs", "sm", "md", "lg", "xl", "xxl". This will make your design pattern a lot more consistant, while being extremely easy to work with.

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

Once a valid name is defined, you can then use the custom component as a normal HTMLElement as such:

```HTML
<element-name p="sm" ml="xxl">Hello world!</element-name>
```

But! Currently, we are relying on the falback size values. To override the fallback values, we use css variables.

```CSS
    :root {
        --xxs: 1px; 
        --xs: 2px; 
        --sm: 3px; 
        --md: 6px; 
        --lg: 12px; 
        --xl: 24px; 
        --xxl: 40px; 
    }
```

## Default size values
- zero: "var(--zero, 0)",
- xs: "var(--xxs, 1px)",
- xs: "var(--xs, 2px)",
- sm: "var(--sm, 4px)",
- md: "var(--md, 8px)",
- lg: "var(--lg, 12px)",
- xl: "var(--xl, 20px)",
- xxl: "var(--xxl, 32px)",


## Using with React and Typescript
If you try to use a custom element with React and TypeScript, you'll need to define it in the JSX global scope

If you look in your tsconfig, you can typecally see where your typings are located. It may look something like this:

```JSON
		"typeRoots": [
			"./node_modules/@types",
			"./typings/"
		],
```
In your typings folder, or whatever it is called, there is usually a file where you define your globals. In that file, you define the custom element as such:

```TypeScript
import React from "react";
import type { IDesignBlock } from "@flemminghansen/design-block";

export {};

type ReactWebComponent<T> = T & React.HTMLAttributes<HTMLElement>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "element-name": ReactWebComponent<IDesignBlock>;
    }
  }
}

```

You should now be able to use the custom-element without type errors.

# Attributes
Design block is based on flex with column as direction to simulate a normal block, but with the benefit of being able to use columnGap and rowGap as properties.


## direction
flexDirection

"column" | "row"

Defaults to "column".

## transition
transition

string

Defaults to "var(--transition, all 300ms)".

## p
padding

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## px
padding-left and padding-right

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## py
padding-top and padding-bottom

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## pt
padding-top

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## pr
padding-right

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## pb
padding-bottom

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## pl
padding-left

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## m
margin

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## mx
margin-left and margin-right

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## my
margin-top and margin-bottom

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## mt
margin-top

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## mr
margin-right

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## mb
margin-bottom

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## ml
margin-left

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## rowgap
rowGap

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.

## colgap
columnGap

"zero" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

Defaults to undefined.


# Customization
Because the DesignBlock class is an extended HTMLElement, you can use it to create multiple Design blocks by extending the DesignBlock class.


```JavaScript
import { DesignBlock, define } from "@flemminghansen/design-block";

class MyContainer extends DesignBlock {
  constructor() {
    super();
    // use custom properties to set values, or simple values like "20px" or "#eee"
    this.style.background = "var(--container-background)";
    this.style.borderRadius = "var(--border-radius)";
    this.style.border = "var(--border)";
    this.style.rowGap = "var(--lg)";
    this.style.padding = "var(--xxl)";
  }
}

define('my-container', MyContainer);
define('design-block', DesignBlock);
```

Then you can use the elements as you like:
```HTML
<body>
    <style>
      :root {
        --container-background: #eee;
        --border-radius: 3px;
        --border: 1px solid #aaa;
        --xxs: 1px; 
        --xs: 2px; 
        --sm: 4px; 
        --md: 8px; 
        --lg: 12px; 
        --xl: 20px; 
        --xxl: 32px; 
      }

      @media (max-width: 60em) {
        :root {
            --xxs: 1px; 
            --xs: 1px; 
            --sm: 2px; 
            --md: 4px; 
            --lg: 8px; 
            --xl: 12px; 
            --xxl: 20px; 
      }
    }
  </style>
  <my-container pt="zero">
    <design-block>Hello world!</design-block>
    <design-block direction="row" colgap="lg">
      <span>We are using design blocks</span>
      <span>With columns</span>
      <span>And rows!</span>
    </design-block>
  </my-container>
  {/* etc... */}
</body>
```