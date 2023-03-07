import React from "react";
import "./jobwall.css";
import { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Jobwall({ name }) {
  const { user, loading } = useContext(AuthContext);

  const postItem = {
    title: "",
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
    await axios
      .post("http://localhost:8888/jobwall", post)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
        console.log("Frontend: A new post is created");
      })
      .catch((err) => {
        if (err) {
          console.log(`Backend: ${err}`);
        }
      });
  };

  const maxCh = 60;
  const toggleBtn = () => {
    setReadMore(!readMore);
  };

  const now = moment(new Date().getTime());

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://localhost:8888/jobwall");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, [post]);

  return (
    <div className="backgroundBody">
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
                    <b>{post.title} </b>{" "}
                  </h5>
                  <p className="post-date">
                    {moment(now).format("ddd, YYYY-MM-DD")}
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
                                  `http://localhost:8888/jobwall/delete-post/${post?._id}`,
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
                          <IconButton aria-label="edit" size="small">
                            <EmailIcon fontSize="inherit" color="inherit" />
                          </IconButton>{" "}
                          <NavLink
                            to={`/portfolio/${name}`}
                            className="post-author"
                          >
                            {name}
                          </NavLink>
                        </div>
                      </div>
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
                    <b>{post.title} </b>{" "}
                  </h5>
                  <p className="post-date">
                    {moment(now).format("ddd, YYYY-MM-DD")}
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
                        <NavLink to="/login" className="post-author">
                          <IconButton aria-label="edit" size="small">
                            <EmailIcon fontSize="inherit" color="inherit" />
                          </IconButton>{" "}
                          Jason
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
    </div>
  );
}
