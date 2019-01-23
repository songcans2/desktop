import * as Path from 'path'
import * as FSE from 'fs-extra'

import { Repository } from '../../models/repository'

/**
 * Check the `.git/REBASE_HEAD` file exists in a repository to confirm
 * a rebase operation is underway.
 */
export async function isRebaseHeadSet(
  repository: Repository
): Promise<boolean> {
  const path = Path.join(repository.path, '.git', 'REBASE_HEAD')
  return FSE.pathExists(path)
}
