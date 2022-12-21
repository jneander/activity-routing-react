#!/usr/bin/env node

const path = require('path')

const {getEnv} = require('@jneander/dev-utils-node').cli
const {buildCommand, runConcurrently} = require('@jneander/dev-utils-node').commands

const cwd = process.cwd()
const env = {
  NODE_ENV: getEnv('production'),
}
const sourcePath = path.join(cwd, 'src')
const distPath = path.join(cwd, 'dist')

const ignoreFiles = ['**/*.spec.*', '**/specs/**']

function buildArgs(type) {
  const args = [
    '--config-file',
    path.join(__dirname, '..', `config/babelrc.${type}.js`),

    '--extensions',
    '.ts,.tsx',

    '--ignore',
    ignoreFiles.join(','),

    '--out-dir',
    path.join(distPath, type),
  ]

  if (process.argv.includes('--watch')) {
    args.push('--watch')
  }

  return args.concat([sourcePath])
}

runConcurrently({
  'build:esm': buildCommand('babel', buildArgs('esm'), env),
  'build:cjs': buildCommand('babel', buildArgs('cjs'), env),
})
