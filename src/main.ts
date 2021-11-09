import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as glob from '@actions/glob'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const matchersPath = path.join(__dirname, '..', '.github')
    core.info(`##[add-matcher]${path.join(matchersPath, 'ruby-check.json')}`)
    const rubySwitch = core.getInput('switch', {required: true})
    const paths = core.getInput('paths', {required: true})
    const globber = await glob.create(paths)
    let rubyFiles = await globber.glob()
    if (rubyFiles.length === 0) {
      core.info('No ruby files found')
      return
    }
    const workingPath = process.cwd()
    rubyFiles = rubyFiles.map(file => file.replace(`${workingPath}/`, ''))
    await Promise.all(
      rubyFiles.map(async file => {
        await exec.exec('ruby', [rubySwitch, file])
      })
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
