import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listForumPosts } from "../actions/forumActions";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Card, ListItemButton } from "@mui/material";
import ForumPostAdder from "../components/ForumPostAdder";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TextField from "@mui/material/TextField";

function ForumScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forumPostList = useSelector((state) => state.forumPostList);
  const { loading, error, forumPosts } = forumPostList;
  const forumPostCreate = useSelector((state) => state.forumPostCreate);
  const [searchField, setSearchField] = React.useState("");

  const filteredForumPosts =
    forumPosts &&
    forumPosts.filter((forumPost) =>
      forumPost.title.toLowerCase().includes(searchField.toLowerCase())
    );

  useEffect(() => {
    dispatch(listForumPosts());
  }, [forumPostCreate.success]);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  // console.log(forumPostList);
  return (
    <div>
      <h1>Forum</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card sx={{ borderRadius: "1rem", padding: "1rem", marginTop: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" marginX={1}>
              Posts
            </Typography>

            <TextField
              size="small"
              color="warning"
              sx={{ width: "50%" }}
              placeholder="Search Posts"
              onChange={handleChange}
            />
            <ForumPostAdder />
          </Box>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {filteredForumPosts.map((forumPost) => (
              <React.Fragment key={forumPost._id}>
                <ListItemButton
                  alignItems="flex-start"
                  key={forumPost._id}
                  sx={{ borderRadius: "1rem", padding: "1rem" }}
                  onClick={() => {
                    navigate(`/forum/${forumPost._id}`);
                  }}
                >
                  {/* <ListItemAvatar>
                  <Avatar children={forumPost.username[0].toUpperCase()} />
                </ListItemAvatar> */}
                  <ListItemText
                    primary={forumPost.title}
                    primaryTypographyProps={{
                      sx: {
                        wordBreak: "break-word",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      },
                    }}
                    secondary={
                      <Typography
                        sx={{
                          wordBreak: "break-word",
                          color: "GrayText",
                          fontSize: "0.9rem",
                        }}
                      >
                        {forumPost.message.length <= 100
                          ? forumPost.message
                          : forumPost.message.substring(0, 100) + "..."}
                      </Typography>
                    }
                  />
                </ListItemButton>
                {forumPost !== forumPosts[forumPosts.length - 1] && (
                  <Divider variant="middle" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Card>
      )}
    </div>
  );
}

export default ForumScreen;
