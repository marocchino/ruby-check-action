import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as glob from '@actions/glob'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const matchersPath = path.join(__dirname, '..', '.github')
    core.info(`##[add-matcher]${path.join(matchersPath, 'ruby-check.json')}`)
    const globber = await glob.create('**/*.rb')
    const rubyFiles = await globber.glob()
    const workingPath = process.cwd()

    if (rubyFiles.length > 0) {
      const options = {
        listeners: {
          stdout: (data: Buffer) => {
            core.info(data.toString().replace(`${workingPath}/`, ''))
          },
          stderr: (data: Buffer) => {
            core.info(data.toString().replace(`${workingPath}/`, ''))
          }
        }
      }
      await exec.exec('ruby', ['-wc', ...rubyFiles], options)
    } else {
      core.info('No ruby files found')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
