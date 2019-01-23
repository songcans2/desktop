import * as React from 'react'
import { DialogContent, Dialog, DialogFooter } from '../dialog'
import { ButtonGroup } from '../lib/button-group'
import { Button } from '../lib/button'
import { DialogHeader } from '../dialog/header'

interface IRebaseConflictsDialog {
  readonly onDismissed: () => void
}

export class RebaseConflictsDialog extends React.Component<
  IRebaseConflictsDialog,
  {}
> {
  private onDismissed = () => {
    this.props.onDismissed()
  }

  private onSubmit = () => {
    this.props.onDismissed()
  }

  public render() {
    return (
      <Dialog
        id="rebase-conflicts-list"
        dismissable={true}
        onDismissed={this.onDismissed}
        disableClickDismissalAlways={true}
        onSubmit={this.onSubmit}
      >
        <DialogHeader
          title="Rebase conflicts found"
          dismissable={true}
          onDismissed={this.onDismissed}
        />
        <DialogContent>
          <p>TODO</p>
        </DialogContent>
        <DialogFooter>
          <ButtonGroup>
            <Button type="submit">Close</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}
