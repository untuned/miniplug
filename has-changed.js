/**
 * Exit with `1` if the project needs to be rebuilt.
 *
 * Usage: `node has-changed || <command_to_build>`
 */

const stat = require('fs').statSync
const glob = require('glob').sync

const files = glob('src/**/*.js')

const sourceTime = Math.max.apply(Math, files.map(stat).map(s => s.atime))
const builtTime = Math.max(stat('index.js').atime, stat('index.es.js').atime)

process.exit(sourceTime > builtTime ? 1 : 0)
