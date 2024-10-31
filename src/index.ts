export { define } from "@ognaf/core";

type ISizeDefinitions = {
  zero: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

// todo plural fy fy

type IPadding = "p" | "px" | "py" | "pt" | "pr" | "pb" | "pl";
type IMargin = "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml";
type IFlexSpacingAttribute = "rowgap" | "colgap";
type ISizeAttribute = IPadding | IMargin | IFlexSpacingAttribute;
type IAttribute = ISizeAttribute | "direction" | "transition";

type ISizes = keyof ISizeDefinitions;

/**
 * IDesignBlock is a type used to define props in React
 */
export type IDesignBlock = Partial<
  | Record<ISizeAttribute, keyof ISizeDefinitions> & {
      direction: "row" | "column";
      transition: string;
    }
>;

export class DesignBlock extends HTMLElement {
  static sizeAttributes: ISizeAttribute[] = [
    "p",
    "px",
    "py",
    "pt",
    "pr",
    "pb",
    "pl",
    "m",
    "mx",
    "my",
    "mt",
    "mr",
    "mb",
    "ml",
    "rowgap",
    "colgap",
  ];

  static observedAttributes: IAttribute[] = [
    ...DesignBlock.sizeAttributes,
    "direction",
    "transition",
  ];

  #sizes: ISizes[] = ["zero", "xs", "sm", "md", "lg", "xl", "xxl"];
  #attrMap: Record<ISizeAttribute, (keyof CSSStyleDeclaration)[]> = {
    p: ["padding"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    m: ["margin"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    colgap: ["columnGap"],
    rowgap: ["rowGap"],
  };

  #defaults: ISizeDefinitions = {
    zero: "var(--zero, 0)",
    xs: "var(--xs, 2px)",
    sm: "var(--sm, 4px)",
    md: "var(--md, 8px)",
    lg: "var(--lg, 12px)",
    xl: "var(--xl, 20px)",
    xxl: "var(--xxl, 32px)",
  };

  #updateAttributes() {
    DesignBlock.sizeAttributes.forEach((attr) => {
      const size = this.getAttribute(attr) as ISizes | undefined;
      if (size && this.#sizes.includes(size)) {
        this.#attrMap[attr].forEach((element: keyof CSSStyleDeclaration) => {
          //@ts-expect-error - We already defined the legal subset in attrMap
          this.style[element] = this.#defaults[size];
        });
      } else {
        this.#attrMap[attr].forEach((element) => {
          //@ts-expect-error - We already defined the legal subset in attrMap
          this.style[element] = undefined;
        });
      }
    });
    this.style.flexDirection =
      this.getAttribute("direction") === "row" ? "row" : "column";
    this.style.transition = this.getAttribute("direction") || `all 300ms`;
  }

  connectedCallback() {
    this.style.display = "flex";

    this.#updateAttributes();
  }

  attributeChangedCallback() {
    this.#updateAttributes();
  }
}
