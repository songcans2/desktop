import * as Path from 'path'
import * as FSE from 'fs-extra'

import { Repository } from '../../models/repository'
import { git } from './core'
import { WorkingDirectoryFileChange } from '../../models/status'
import { ManualConflictResolution } from '../../models/manual-conflict-resolution'
import { stageConflictedFile } from './stage'

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
export async function continueRebase(
  repository: Repository,
  files: ReadonlyArray<WorkingDirectoryFileChange>,
  manualResolutions: ReadonlyMap<string, ManualConflictResolution> = new Map()
) {
  // apply conflict resolutions
  for (const [path, resolution] of manualResolutions) {
    const file = files.find(f => f.path === path)
    if (file !== undefined) {
      await stageConflictedFile(repository, file, resolution)
    } else {
      log.error(
        `couldn't find file ${path} even though there's a manual resolution for it`
      )
    }
  }

  await git(['rebase', '--continue'], repository.path, 'continueRebase')
}
