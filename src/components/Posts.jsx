import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextArea from './TextArea';
import NewPost from './NewPost';
import Timeline from './Timeline';

const StyledMsgCtn = styled.div`
    font-family: 'Roboto', sans-serif;
`;

const StyledCoversation = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
`;

const Post = ({ posts, userMap }) => {
  const [newPost, updatePostTimeLine] = useState([]);

  return (
    <StyledMsgCtn>
      <StyledCoversation>
        <Timeline
          posts={posts}
          userMap={userMap}
        />
        <NewPost
          newPost={newPost}
        />
      </StyledCoversation>
      <TextArea updatePostTimeLine={updatePostTimeLine} />
    </StyledMsgCtn>
  );
};

/**
 * propTypes for this component
 */
Post.propTypes = {
  posts: PropTypes.array.isRequired,
  userMap: PropTypes.object.isRequired,
};

export default Post;
