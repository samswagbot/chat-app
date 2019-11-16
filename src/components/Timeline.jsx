import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const StyledUserNameCtn = styled.div`
    display: flex;    
    flex-direction: row;
    height: 10px;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const StyledAvatar = styled.img`
    border-radius: 50%;
    bottom: 13px;
    height: 2.5em;
    margin-right: 9px;   
    position: relative;
    width: 2.5em;
`;
const StyledUserName = styled.div`
    background-color: white;
    font-size: 10px;
    margin: 0px 6px 5px 52px;
`;
const StyledTsCtn = styled.div`
    font-size: 10px;
`;
const StyledPostMessage = styled.div`
    &.hover-state {
        display: none;
    }
    &.message {
        background-color: rgb(246, 246, 246);
        border-radius: 5px;
        color: rgb(53, 40, 73);
        display: flex;
        font-size: 12px;
        line-height: 1.0625em;
        padding: 24px;
        text-align: left;
    } 
`;
const StyledCalenderIcon = styled.img`
    align-self: center;
    color: white;   
    height: 0.75em;
    padding-right: 5px;
`;
const StyledPostCtn = styled.div`
    display: flex;
    height: 3.75em;   
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
          transition:.4s;
          width: 100%; 
      }
`;

const StyledCtn = styled.div`
    margin-top: 1.25em;
    margin-right: 3.75em;
    transition: .2s;
    
    &:last-child {
      margin-bottom: 1.25em;
      @media (max-width: 600px) {
        margin-bottom: 2.5em;
        transition: .2s
      }

      @media (max-width: 414px) {
        margin-bottom: 3.75em;
        transition: .2s
      }
    }

    @media (max-width: 600px) {
      margin-top: 2.5em;
      transition: .2s
    }

    @media (max-width: 414px) {
      margin-top: 4.375em;
      transition: .2s
    }
`
const Timeline = ({ posts, userMap }) => {
  const displayMessageTime = (time) => {
    const date = DateTime.fromMillis(time * 1000);
    return date.toFormat('t');
  };

  const displaySinceActive = (time) => {
    const date = DateTime.fromMillis(time * 1000);
    return `${`active since ${date.toFormat('DDD')}`}`;
  };

  return (
    <>
      {posts.map((post, key) => (
        <StyledCtn key={key}>
           <StyledUserNameCtn>
                <StyledUserName>
                  {userMap[post.user].username}
                </StyledUserName>
                <StyledTsCtn>
                  {displayMessageTime(post.ts)}
                </StyledTsCtn>
          </StyledUserNameCtn>
            <StyledPostCtn>
              <StyledAvatar
                src={userMap[post.user].avatar}
                alt={userMap[post.user].real_name}
              />
            <StyledHoverCtn>
              <StyledPostMessage className="message">
                { post.message }
              </StyledPostMessage>
              <StyledPostMessage className="hover-state">
                <StyledCalenderIcon src={userMap[post.user].cal} alt="cal-icon" />
                {displaySinceActive(post.ts)}
              </StyledPostMessage>
            </StyledHoverCtn>
          </StyledPostCtn>
        </StyledCtn>
      ))}
    </>
  );
};

/**
 * propTypes for this component
 */
Timeline.propTypes = {
  posts: PropTypes.array.isRequired,
  userMap: PropTypes.object.isRequired,
};

export default Timeline;
