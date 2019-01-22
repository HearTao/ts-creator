declare module "prettier/parser-typescript" {
    import { Plugin } from 'prettier'

    const plugin: Plugin
    export default plugin
}

declare module "prettier/standalone" {
    export * from 'prettier'
}
