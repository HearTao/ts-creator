declare module "cardinal" {
  interface Highlight {
    (code: string, options?: object): string
  }
  export var highlight: Highlight
}