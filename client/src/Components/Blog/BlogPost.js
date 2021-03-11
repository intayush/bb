import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import M from "materialize-css";
import { connect } from "react-redux";
import './BlogPost.css';

import * as actions from "../../store/actions/index";

const Blog = props => {
  const [blogPostData, setBlogPostData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      window.scroll({
        top: 70,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }

    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {});
  }, []);

  const blogId = props.match.params.id;
  useEffect(() => {
    async function fetchData() {
      // const result = await axios
      //   .get(
			// "http://localhost/wordpress/index.php/wp-json/wp/v2/posts/" + blogId
      //   )
      //   .then(response => {
      //     setBlogPostData(response.data);
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     setError("true");
      //     setIsLoading(false);
      //     console.log(error);
      //   });
      props.getBlogForTheBlogId(blogId);
      if (props.blog) {
        setBlogPostData(props.blog.data);
      }
    }
    fetchData();
  }, []);

var blogPosts = "";
var blogPostDiv = '';
let finalBlogContent = '';

var blogContent = '';
if(props && props.blog && props.blog.data && props.blog.data.content && props.blog.data.content.rendered)
{
  blogContent = props.blog.data.content.rendered;
  let replaceThis = 'http:\/\/10.10.47.111:8080\/blogs\/wp-content\/uploads';
  let rep = new RegExp(replaceThis, 'g');
  finalBlogContent = blogContent.replace(rep, 'https:\/\/bikebazaar.com\/blogs\/wp-content\/uploads')
}


if (error === true){
  blogPostDiv = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
} else if (error === false && props.isLoading === false) {

  if(props && props.blog && props.blog.data){
    console.log(props.blog.data)
	blogPostDiv = <div className="row">
	<article className="Post">
	  <div className="Info">
		<div
		  dangerouslySetInnerHTML={{
			__html: ( finalBlogContent)
		  }}
		/>
	  </div>
	</article>
  </div>
}
}else {
  blogPostDiv = <p style={{ textAlign: "center" }}>Loading Blog Posts!</p>;
}

if(props && props.blog && props.blog.data)
  blogPosts = (
    <>
      <Banner
        navigation="Blog"
        heading={ props.blog.data &&  props.blog.data.title && ( props.blog.data.title.rendered).replace(/[\uE000-\uF8FF]/g, '')}
        text=""
        path="/blog"
      />
      <div className="locateDropdownCard">
	  	{blogPostDiv}
      </div>
    </>
  );

  return (
    <div id="Blog">
      {/* <Header /> */}
      <MainMenu />
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        className="mtop40"
      >
        <Grid item xs={11} md={11} sm={11} lg={11}>
          <div className="blogResetStyle">
            {blogPosts}
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blog: state.blogDetails.blog,
    isLoading: state.blogDetails.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBlogForTheBlogId: (blogId) =>
      dispatch(actions.getBlogForTheBlogId(blogId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);