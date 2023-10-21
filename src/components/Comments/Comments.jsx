import React from "react";
import PropTypes from "prop-types";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";
// import { comments } from "../../helpers/comments";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/filterSlice";
import { useGetCommentsQuery } from "../../redux/commentApi";
import { Spinner } from "../Spinner/Spinner";

export const Comments = () => {
  const { data: comments, isError, isLoading } = useGetCommentsQuery();

  const filter = useSelector(selectFilter);

  const filteredComments = comments?.filter(({ content }) =>
    content.toLowerCase().includes(filter.toLowerCase())
  );

  if (!comments) {
    return isLoading && <p>Loading ...</p>;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <p>Is Error</p>}
      <Grid>
        {comments &&
          filteredComments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
      </Grid>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
