declare type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

declare type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
