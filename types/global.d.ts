type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type CamelCase<S extends string> = S extends `${infer T} ${infer U}` ? `${Lowercase<T>}${Capitalize<CamelCase<U>>}` : S;
