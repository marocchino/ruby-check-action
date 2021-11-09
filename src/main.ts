import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as glob from '@actions/glob'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const matchersPath = path.join(__dirname, '../..', '.github')
    core.info(`##[add-matcher]${path.join(matchersPath, 'ruby-check.json')}`)
    const globber = await glob.create('**/*.rb')
    const rubyFiles = await globber.glob()
    await exec.exec('ruby', ['-wc', ...rubyFiles])
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
