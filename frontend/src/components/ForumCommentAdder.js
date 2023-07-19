import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { createForumComment } from "../actions/forumActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ForumCommentAdder({ forumPostId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClickOpen = () => {
    if (userInfo) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    try {
      await dispatch(createForumComment(forumPostId, message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        variant="text"
        color="warning"
        onClick={handleClickOpen}
        sx={{ marginBottom: 1, padding: 1 }}
        fullWidth
      >
        <AddIcon sx={{ marginRight: 1 }} />
        Comment
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Comment</DialogTitle>
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
              placeholder="Mesage Body"
              inputProps={{ maxLength: 500 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Comment</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
