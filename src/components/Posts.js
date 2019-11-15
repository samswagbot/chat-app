import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubmitMessage from './SubmitMessage';
import NewPost from './NewPost';
import Timeline from './Timeline';

//css animation
//eslint
//hover

const StyledMsgCtn = styled.div`
    font-family: 'Roboto', sans-serif;
`; 

const StyledCoversation = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
`;

const Post = ({ posts, userMap }) => {
    const [active, setActive] = useState(false);
    const [newPost, updatePostTimeLine] = useState([]);	

    return ( 
      <StyledMsgCtn>
          <StyledCoversation>
            <Timeline 
                active={active}
                posts={posts} 
                setActive={setActive}
                userMap={userMap}
            />
            <NewPost 
                active={active}
                newPost={newPost}
                setActive={setActive}
            />
        </StyledCoversation>
        <SubmitMessage updatePostTimeLine={updatePostTimeLine} />     
    </StyledMsgCtn>
)};

/**
 * propTypes for this component
 */
Post.propTypes = {
    posts: PropTypes.array.isRequired,
    userMap: PropTypes.object.isRequired
  };

export default Post;
