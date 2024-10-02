import * as InputVariants from "@/components/Input";

export type InputVariantTypes = keyof typeof InputVariants;

export type Variants = InputVariantTypes extends `Input${infer V}Variant` ? V : InputVariantTypes;

export type InputComponentProps = {
  [K in InputVariantTypes]: Parameters<(typeof InputVariants)[K]>;
}[InputVariantTypes][0];

export type InputVariantProps<V extends Variants | undefined = undefined> = `Input${V}Variant` extends InputVariantTypes
  ? Parameters<(typeof InputVariants)[`Input${V}Variant`]>[0]
  : InputComponentProps;
