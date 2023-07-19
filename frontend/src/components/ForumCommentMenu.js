import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  updateForumComment,
  deleteForumComment,
} from "../actions/forumActions";
import { useDispatch } from "react-redux";

export default function ForumCommentMenu({ comment, postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    dispatch(deleteForumComment(comment._id));
  };

  const handleEdit = () => {
    setAnchorEl(null);
    handleClickOpen();
  };

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(comment && comment.message);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      await dispatch(updateForumComment(comment._id, message, postId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton size="small" onClick={handleMenuClick}>
        <MoreVertIcon fontSize="small"></MoreVertIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>Comment Message</DialogContentText>
            <TextField
              required
              error={message === ""}
              id="message"
              size="small"
              multiline
              minRows={4}
              sx={{ width: 1, my: 1 }}
              onChange={(e) => setMessage(e.target.value)}
              inputProps={{ maxLength: 500 }}
              defaultValue={comment && comment.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
