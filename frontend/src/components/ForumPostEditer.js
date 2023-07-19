import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { updateForumPost } from "../actions/forumActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ForumPostEditer({ forumPost }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(forumPost.title);
  const [message, setMessage] = React.useState(forumPost.message);

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
      await dispatch(updateForumPost(forumPost._id, title, message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditOutlinedIcon color="warning"></EditOutlinedIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogContent>
            <DialogContentText>Post Title</DialogContentText>
            <TextField
              required
              error={title === ""}
              id="title"
              size="small"
              sx={{ width: 1, my: 1 }}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{ maxLength: 200 }}
              defaultValue={forumPost.title}
            />

            <DialogContentText>Post Message</DialogContentText>
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
              defaultValue={forumPost.message}
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
