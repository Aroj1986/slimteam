import React from "react";
import "./jobwall.css";
import { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import axios from "../../axiosClient";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
//import EmailIcon from "@mui/material/Email";

export default function Jobwall({ name }) {
  const { user } = useContext(AuthContext);

  const postItem = {
    title: "",
    author: user?._id,
    description: "",
  };

  const [posts, setPosts] = useState();
  const [post, setPost] = useState(postItem);
  const [readMore, setReadMore] = useState(false);

  const handleOnChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleOnClickPost = async (e) => {
    e.preventDefault();
    post.author = user._id
    console.log(post)
    await axios
      .post("/jobwall", post)
      .then((res) => {
        setPost(res.data);
        console.log("Frontend: A new post is created");
      })
      .catch((err) => {
        if (err) {
          console.log(`Backend: ${err}`);
        }
      });
  };

  const maxCh = 150;
  const toggleBtn = () => {
    setReadMore(!readMore);
  };

  const now = moment(new Date().getTime());

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("/jobwall");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, [post]);

  console.log(posts);

  return (
    <>
      {user ? (
        <div>
          <div className="post-input-container">
            <div className="post-div">
              <h6>Create a new job post</h6>
              <input
                className="post-input"
                placeholder="Job title"
                type="text"
                name="title"
                value={post.title}
                onChange={handleOnChange}
                id="title"
                required
              ></input>
              <textarea
                className="post-input"
                placeholder="Job description"
                type="text"
                name="description"
                value={post.description}
                onChange={handleOnChange}
                id="description"
                required
              ></textarea>
              <div className="attachment-div">
                <button className="post-image-btn">Attach files</button>
                <button className="post-submit" onClick={handleOnClickPost}>
                  Submit job
                </button>
              </div>
            </div>
          </div>

          <div>
            {posts?.map((post) => {
              return (
                <div className="post-container">
                  <div className="post-card">
                    <h5>
                      <b>{post.title}</b>
                    </h5>
                    <p>
                      {moment(now).format("ddd, YYYY-MM-DD HH:mm")} - by{" "}
                      <NavLink to="/profile" className="post-author">
                        {name}
                      </NavLink>
                    </p>
                    <div className="post-item">
                      <div className="post-description">
                        {readMore
                          ? post.description
                          : post.description.substring(0, maxCh)}
                        <button onClick={toggleBtn} className="read-more-less">
                          {readMore ? "read less" : "... read more"}
                        </button>
                        <IconButton aria-label="delete" size="small">
                          <DeleteIcon
                            fontSize="inherit"
                            onClick={async () => {
                              const postOne = {
                                title: post.title,
                                description: post.description,
                              };

                              await axios
                                .put(
                                  `/jobwall/delete-post/${post?._id}`,
                                  postOne
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  setPost(res.data);
                                })
                                .catch((err) => {
                                  console.log(
                                    `Error deleting post in database: ${err}`
                                  );
                                });
                            }}
                          />
                        </IconButton>
                      </div>
                      <hr className="horizontal-line" />
                      <div className="response-div">
                        <div>
                          If you are interested, please contact: 
{/*                           <IconButton aria-label="edit" size="small">
                            <EmailIcon fontSize="inherit" color="inherit" onClick={() =>
                              (window.location = `mailto:${user?.personal_details?.email}`)
                            } />
                          </IconButton>{" "} */}
                          <NavLink
                            to={`/portfolio/${name}`}
                            className="post-author"
                          >
                            {post.author}
                          </NavLink>
                        </div>                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {posts?.map((post) => {
            return (
              <div className="post-container">
                <div className="post-card">
                  <h5>
                    <b>{post.title}</b>
                  </h5>
                  <p>
                    {moment(now).format("ddd, YYYY-MM-DD HH:mm")} - by{" "}
                    <NavLink to="/profile" className="post-author">
                    {post.author}
                    </NavLink>
                  </p>
                  <div className="post-item">
                    <div className="post-description">
                      {readMore
                        ? post.description
                        : post.description.substring(0, maxCh)}
                      <button onClick={toggleBtn} className="read-more-less">
                        {readMore ? "read less" : "... read more"}
                      </button>
                    </div>
                    <hr className="horizontal-line" />
                    <div className="response-div">
                        <div>
                          If you are interested, please contact: 
{/*                           <IconButton aria-label="edit" size="small">
                            <EmailIcon fontSize="inherit" color="inherit" onClick={() =>
                              (window.location = `mailto:${user?.personal_details?.email}`)
                            } />
                          </IconButton>{" "} */}
                          <NavLink
                            to={`/portfolio/${name}`}
                            className="post-author"
                          >
                            {post.author}
                          </NavLink>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}