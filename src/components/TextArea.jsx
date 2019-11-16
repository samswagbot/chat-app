import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime } from 'luxon';

const StyledInputCtn = styled.div`
    display: flex;
`;

const StyledInput = styled.input`
    border:none;
    border-top: 1px solid rgb(46,197, 155);
    font-size: 0.875em;
    height: 2.5em;
    text-indent: 4%;
    width: 100%;
    
    &::placeholder {
        color: rgb(207 , 215, 215);
        font-size: 10px;
        text-indent: 4%;
    }
`;

const StyledCharactersRemaining = styled.div`
    align-self: center;
    display: flex;
    color: rgb(168, 182, 182);
    font-size: 8px;
    position: absolute;
`;
const StyledSendIcon = styled.i`
    font-size: 18px;
        &.active {
            color: green;
        }
        &.not-active {
            color: rgb(168, 182, 182);
        }
`;
const StyledButton = styled.button`
    border: none;
    border-top: 1px solid rgb(46,197, 155);
    cursor: pointer;
`;
const SubmitMessage = ({ updatePostTimeLine }) => {
  const [remainingChars, updateCounter] = useState(140);
  const [value, setValue] = useState('');

  const sendNewPost = async () => {
    const now = DateTime.local();
    const data = {
      users: {
        id: 4,
        username: '',
        real_name: '',
        verified: true,
      },
      posts: {
        id: 15454534535,
        message: value,
        user: 4,
        ts: now.ts,
      },
    };

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json;',
        },
      });
      const sucessfulPost = await response.json();
      console.log('Success:', sucessfulPost);
    } catch (error) {
      console.error('Could not POST new post. Error:', error);
    }
    updatePostTimeLine((newPost) => [...newPost, data]);
  };

  const textCounter = () => updateCounter(140 - value.length);

  const submitOnEnter = (e) => {
    if (e.which === 13 && value !== '') {
      sendNewPost();
    }
  };

  const handleOnClick = () => {
    if (value !== '') {
      sendNewPost();
    }
  };
  return (
    <StyledInputCtn>
      <StyledInput
        aria-label="Text Area"
        type="text"
        maxLength={140}
        placeholder="what's happening?"
        onChange={(e) => setValue(e.currentTarget.value)}
        value={value}
        tabIndex={0}
        autoComplete="on"
        onKeyUp={textCounter}
        onKeyDown={submitOnEnter}
      />
      <StyledCharactersRemaining>
        {remainingChars}
      </StyledCharactersRemaining>
      <StyledButton
        aria-label="Submit"
        onClick={handleOnClick}
      >
        <StyledSendIcon
          className={value !== ''
            ? 'material-icons active'
            : 'material-icons not-active'}
          id="send"
        >
          send
        </StyledSendIcon>
      </StyledButton>
    </StyledInputCtn>
  );
};

/**
 * propTypes for this component
 */

SubmitMessage.propTypes = {
  updatePostTimeLine: PropTypes.func,
};

SubmitMessage.defaultProps = {
  updatePostTimeLine: () => {},
};

export default SubmitMessage;
