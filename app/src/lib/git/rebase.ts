import * as Path from 'path'
import * as FSE from 'fs-extra'

import { Repository } from '../../models/repository'
import { git } from './core'

/**
 * Check the `.git/REBASE_HEAD` file exists in a repository to confirm
 * a rebase operation is underway.
 */
export function isRebaseHeadSet(repository: Repository) {
  const path = Path.join(repository.path, '.git', 'REBASE_HEAD')
  return FSE.pathExists(path)
}

/** Abandon the current rebase operation */
export async function abortRebase(repository: Repository) {
  await git(['rebase', '--abort'], repository.path, 'abortRebase')
}

/** Proceed with the current rebase operation */
export async function continueRebase(repository: Repository) {
  await git(['rebase', '--continue'], repository.path, 'continueRebase')
}
