import * as fs from 'fs'
import * as path from 'path'
import yargs, { Argv, Arguments } from 'yargs'
import { Options as PrettierOptions } from 'prettier'
import { highlight } from 'cardinal'
import * as getStdin from 'get-stdin'
import create, { Options as creatorOptions } from './index'

interface Options {
  input: string,
  output?: string,
  color: boolean
}

function transformFile(creatorOptions: creatorOptions, { input, output, color }: Options): void {
  try {
    const content: string = fs.readFileSync(input, 'utf8')
    const result: string = create(content, creatorOptions)    

    if(!output) {
      console.log('\n' + (color ? highlight(result) : result) + '\n')
      return 
    }

    const target: string = path.resolve(output)
    fs.writeFileSync(target, result, 'utf8')
    console.log(`Done at ${target}`)
  } catch(e) {
    throw new Error(e)
  }
}

function handler(data?: string) {
  return function handler1(argv: Arguments): void {
    const prettierOptions = {
      semi: argv['semi'],
      singleQuote: argv['single-quote'],
      jsxSingleQuote: argv['jsx-single-quote'],
      bracketSpacing: argv['bracket-spacing'],
      tabWidth: argv['tab-width'],
      useTabs: argv['use-tabs'],
      trailingComma: argv['trailing-comma'],
      proseWrap: argv['prose-wrap']
    } as PrettierOptions

    const options = {
      input: argv['input'],
      output: argv['output'],
      color: argv['color']
    } as Options

    if(data) {
      const result: string = create(data, { prettierOptions })
      console.log('\n' + (options.color ? highlight(result) : result) + '\n')
      return
    }

    return transformFile({ prettierOptions }, options)
  }
}

export default async function main(args: string[]): Promise<void> {
  const data: string = await getStdin()  
  const isReadData: boolean = '' !== data

  yargs(args)
    .command({
      command: `$0 ${isReadData ? '' : '<input> '}[options]`,
      handler: handler(isReadData ? data : undefined),
      builder: (yargs: Argv): Argv => {
        if(isReadData) return yargs
        return yargs
          .positional('input', {
            describe: 'input file path',
            type: 'string'
          })
      }
    })
    .demandCommand()
    .option('o', {
      alias: 'output',
      describe: 'Output directory',
      type: 'string',
      // demandOption: true
    })
    .option('color', {
      describe: 'colorful result when print on terminal',
      type: 'boolean',
      default: false
    })

    .options('semi', {
      group: 'Prettier Options',
      default: false,
      type: 'boolean'
    })
    .options('single-quote', {
      group: 'Prettier Options',
      default: true,
      type: 'boolean'
    })
    .options('jsx-single-quote', {
      group: 'Prettier Options',
      default: false,
      type: 'boolean'
    })
    .options('bracket-spacing', {
      group: 'Prettier Options',
      default: true,
      type: 'boolean'
    })
    .options('tab-width', {
      group: 'Prettier Options',
      default: 2,
      type: 'number'
    })
    .options('use-tabs', {
      group: 'Prettier Options',
      default: false,
      type: 'boolean'
    })
    .options('trailing-comma', {
      group: 'Prettier Options',
      default: 'none',
      type: 'string',
      choices: ['none', 'es5', 'all']
    })
    .options('prose-wrap', {
      group: 'Prettier Options',
      default: 'preserve',
      type: 'string',
      choices: ['always', 'never', 'preserve']
    })

    .version('v')
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .epilog('Please see https://ts-creator.js.org')
    .showHelpOnFail(true, 'Specify --help for available options')
    .argv
}