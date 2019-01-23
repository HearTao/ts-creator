import yargs from 'yargs'

export default function main(args: string[]): void {
    console.log(yargs(args).argv)
}