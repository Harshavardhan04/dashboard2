<Box display="flex" justifyContent="space-between">
  {!selectedRow && (
    <>
      <Button onClick={handleOpenAddDialog} variant="contained" color="primary">
        Add Entry
      </Button>
      <ResetButton onClick={handleReset}>
        Reset
      </ResetButton>
    </>
  )}
  {selectedRow && (
    <>
      <Button onClick={handleOpenEditDialog} variant="contained" color="primary">
        Edit Entry
      </Button>
      <Button onClick={handleOpenDeleteDialog} variant="contained" color="secondary">
        Delete Entry
      </Button>
      <CancelEditButton onClick={handleReset}>
        Cancel Edit
      </CancelEditButton>
    </>
  )}
</Box>



<Dialog
  open={openAddDialog}
  onClose={handleCloseAddDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Confirm Add"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to add this entry?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAddDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSubmit} color="primary" autoFocus>
      Confirm
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={openEditDialog}
  onClose={handleCloseEditDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Confirm Edit"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to edit this entry?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={handleEdit} color="primary" autoFocus>
      Confirm
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={openDeleteDialog}
  onClose={handleCloseDeleteDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this entry?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDelete} color="primary" autoFocus>
      Confirm
    </Button>
  </DialogActions>
</Dialog>
