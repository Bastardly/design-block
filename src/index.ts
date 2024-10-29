export { define } from "@ognaf/core";

interface IContainerDefaults {
  zero: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

type IPaddings = "p" | "px" | "py" | "pt" | "pr" | "pb" | "pl";
type IMargins = "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml";
type IFlexSpacingAttributes = "rowgap" | "colgap";
type ISizeAttribute = IPaddings | IMargins | IFlexSpacingAttributes;
type IAttribute = ISizeAttribute | "direction";

type ISizes = keyof IContainerDefaults;

/**
 * IContainerDiv is a type used to define props in React
 */
export type IContainerDiv = Partial<
  | Record<ISizeAttribute, keyof IContainerDefaults> & {
      direction: "row" | "column";
    }
>;

export class ContainerDiv extends HTMLElement {
  #transitionMs = 300;

  constructor(transitionMs?: number) {
    super();
    this.#transitionMs = transitionMs || this.#transitionMs;
  }

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
    ...ContainerDiv.sizeAttributes,
    "direction",
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

  defaults: IContainerDefaults = {
    zero: "0",
    xs: "var(--xs)",
    sm: "var(--sm)",
    md: "var(--md)",
    lg: "var(--lg)",
    xl: "var(--xl)",
    xxl: "var(--xxl)",
  };

  updateAttributes() {
    ContainerDiv.sizeAttributes.forEach((attr) => {
      const size = this.getAttribute(attr) as ISizes | undefined;
      if (size && this.#sizes.includes(size)) {
        this.#attrMap[attr].forEach((element: keyof CSSStyleDeclaration) => {
          //@ts-expect-error - We already defined the legal subset in attrMap
          this.style[element] = this.defaults[size];
        });
      } else {
        this.#attrMap[attr].forEach((element) => {
          //@ts-expect-error - We already defined the legal subset in attrMap
          this.style[element] = undefined;
        });
      }
    });
    this.style.direction =
      this.getAttribute("direction") === "row" ? "row" : "column";
  }

  connectedCallback() {
    this.style.display = "flex";
    this.style.transition = `all ${this.#transitionMs}ms`;
    this.updateAttributes();
  }

  attributeChangedCallback() {
    this.updateAttributes();
  }
}
