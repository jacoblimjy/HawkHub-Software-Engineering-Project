import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Card, Typography, Box, IconButton, Icon } from "@mui/material";
import { getForumPostDetails } from "../actions/forumActions";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ForumPostEditer from "../components/ForumPostEditer";
import { deleteForumPost } from "../actions/forumActions";
import ForumCommentAdder from "../components/ForumCommentAdder";
import ForumCommentMenu from "../components/ForumCommentMenu";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function ForumPostScreen() {
  const { forumPostId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forumPostDetails = useSelector((state) => state.forumPostDetails);
  const { loading, error, forumPost, comments } = forumPostDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const forumPostUpdate = useSelector((state) => state.forumPostUpdate);
  const forumCommentCreate = useSelector((state) => state.forumCommentCreate);
  const forumCommentUpdate = useSelector((state) => state.forumCommentUpdate);
  const forumCommentDelete = useSelector((state) => state.forumCommentDelete);

  useEffect(() => {
    dispatch(getForumPostDetails(forumPostId));
  }, [
    forumPostUpdate.success,
    forumCommentCreate.success,
    forumCommentUpdate.success,
    forumCommentDelete.success,
  ]);

  return (
    <div>
      <h1>Forum Post</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Card
            sx={{ borderRadius: "1rem", padding: "1rem", marginTop: "1rem" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                marginX={1}
                display={"flex"}
                sx={{ width: "100%" }}
              >
                Posted by {forumPost && forumPost.username} on{" "}
                {forumPost && forumPost.date}{" "}
              </Typography>
              {userInfo && forumPost && userInfo._id === forumPost.user && (
                <>
                  <ForumPostEditer forumPost={forumPost} />
                  <IconButton
                    onClick={() => {
                      dispatch(deleteForumPost(forumPostId));
                      navigate("/forum");
                    }}
                  >
                    <DeleteOutlinedIcon color="warning"></DeleteOutlinedIcon>
                  </IconButton>
                </>
              )}
            </Box>

            <Typography variant="h5" marginX={1} marginBottom={1}>
              {forumPost && forumPost.title}
            </Typography>

            <Typography
              variant="body1"
              marginX={1}
              sx={{ wordBreak: "break-word" }}
            >
              {forumPost && forumPost.message}
            </Typography>
            <Typography variant="body2" margin={1}>
              {forumPost && forumPost.no_of_comments} comment(s)
            </Typography>
          </Card>
          <Card
            sx={{ borderRadius: "1rem", padding: "1rem", marginTop: "1rem" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" marginX={1}>
                Comments
              </Typography>
              <ForumCommentAdder forumPostId={forumPostId} />
            </Box>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {comments &&
                comments.map((comment) => (
                  <React.Fragment key={comment._id}>
                    <ListItem alignItems="flex-start" key={comment._id}>
                      <ListItemAvatar>
                        <Avatar
                          children={comment.username[0].toUpperCase()}
                          sx={{ bgcolor: "orange" }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "#808080" }}
                            >
                              {comment.username + " - " + comment.date}
                            </Typography>
                            {userInfo && userInfo._id === comment.user && (
                              <ForumCommentMenu
                                postId={forumPostId}
                                comment={comment}
                              ></ForumCommentMenu>
                            )}
                          </Box>
                        }
                        // primaryTypographyProps={{
                        //   variant: "subtitle2",
                        //   sx: { color: "#808080" },
                        // }}
                        secondary={comment.message}
                        secondaryTypographyProps={{
                          variant: "body1",
                          sx: { wordBreak: "break-word", color: "black" },
                        }}
                        width="100%"
                      />
                    </ListItem>
                    {comment !== comments[comments.length - 1] && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
            </List>
          </Card>
        </>
      )}
    </div>
  );
}
