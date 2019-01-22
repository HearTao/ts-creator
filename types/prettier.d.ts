declare module "prettier/parser-typescript" {
    import { Plugin } from 'prettier'

    const plugin: Plugin
    export default plugin
}

declare module "prettier/standalone" {
    import * as prettier from 'prettier'
    export = prettier
}
