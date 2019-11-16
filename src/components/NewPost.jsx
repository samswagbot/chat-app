import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const StyledPostMessage = styled.div`   
    &.hover-state {
        display: none;
    }
    &.message {
        background-color: rgb(46,197,155);
        border-radius: 5px;
        color: white;
        display: flex;
        font-size: 0.75em;
        line-height: 1.0625em;
        padding: 24px;
        text-align: right;
    }
`;
const StyledUserNameCtn = styled.div`
    display: flex;    
    flex-direction: row;
    justify-content: flex-start;
    height: 0.625em;
    margin: 0px 0px 5px 3px;
`;

const StyledAvatar = styled.img`
    background-color: rgb(37, 23, 58);
    border-radius: 50%;
    height: 2.5em;
    margin-left: 0.5625em; 
    padding: 0px 0.6875em;
    width: 1.125em;
`;
const StyledTsCtn = styled.div`
    font-size: 0.625em;
`;
const StyledPostCtn = styled.div`   
    display: flex;
    height: 3.75em;
`;
const StyledCalenderIcon = styled.img`
    align-self: center;  
    color: white;   
    height: 0.75em;
    padding-right: 5px;
`;

const StyledHoverCtn = styled.div`
    width: 100%;
    &:hover .message{
        display: none;
    }
    &:hover .hover-state {
        align-self: center;
        display: flex;
    }
    &:hover {
        background-color: rgb(37, 23, 58);
        border-radius: 5px;
        color: white;
        display: flex;
        font-size: 0.875em;
        justify-content: center;
        padding: 0.875em;
        transition:.2s;
    }
`;

const StyledCtn = styled.div`
  margin: 0.625em;
  @media (max-width: 600px) {
    margin-top: 4.375em;
    transition:.3s;
  }
`
const NewPost = ({ newPost }) => {
  const displayMessageTime = (time) => {
    const date = DateTime.fromMillis(time);
    return date.toFormat('t');
  };

  const displaySinceActive = (time) => {
    const date = DateTime.fromMillis(time / 1000);
    return `${`active since ${date.toFormat('DDD')}`}`;
  };

  return (
    <>
      {newPost.map((index, key) => (
        <StyledCtn key={key}>
          <StyledUserNameCtn>
            <StyledTsCtn>
              {displayMessageTime(index.posts.ts)}
            </StyledTsCtn>
          </StyledUserNameCtn>
          <StyledPostCtn>
            <StyledHoverCtn>
              <StyledPostMessage className="message">
                {index.posts.message}
              </StyledPostMessage>
              <StyledPostMessage className="hover-state">
                <StyledCalenderIcon src="/svgs/calendar-icon.svg" alt="cal-icon" />
                  {displaySinceActive(index.posts.ts)}
              </StyledPostMessage>
            </StyledHoverCtn>
            <StyledAvatar
              src="/svgs/better-icon.svg"
              alt="better-icon"
            />
          </StyledPostCtn>
        </StyledCtn>
      ))}
    </>
  );
};
/**
 * propTypes for this component
 */

NewPost.propTypes = {
  newPost: PropTypes.array.isRequired,
};

export default NewPost;
