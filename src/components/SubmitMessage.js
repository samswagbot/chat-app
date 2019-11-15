import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime } from "luxon";

const StyledInputCtn = styled.div`
    display: flex;
`;

const StyledInput = styled.input`
    width: 100%;
    border:none;
    border-top: 1px solid rgb(46,197, 155);
    height: 40px;
    text-indent: 4%;

    &::placeholder {
        color: rgb(207 , 215, 215);
        text-indent: 4%;
        font-size: 10px;
    }
    &::-webkit-input-placeholder {
      
     }
     
     &:-moz-placeholder { /* Firefox 18- */
      
     }
     
     &::-moz-placeholder {  /* Firefox 19+ */
      
     }
     
     &:-ms-input-placeholder {  
        
     }
`; 

const StyledCharactersRemaining = styled.div`
    color: rgb(168, 182, 182);
    font-size: 8px;
    position: absolute;
    align-self: center;
    display: flex;
`
const StyledSendIcon = styled.i`
    font-size: 18px;
        &.active {
            color: green;
        }
        &.not-active {
            color: rgb(168, 182, 182);
        }
`
const StyledButton = styled.button`
    border: none;
    border-top: 1px solid rgb(46,197, 155);
    cursor: pointer;  
`
const SubmitMessage =  ({updatePostTimeLine})  => {
    const [remainingChars, updateCounter] = useState(140);
    const [value, setValue] = useState('');
    
    const sendNewPost = async () => {
        const now = DateTime.local();
        const data =  { 
           users: {
                id: 4,
                username: '',
                real_name: '',
                verified: true
             },
            posts: {
                id: 15454534535,
                message: value,
                user: 4,
                ts: now.ts
            }
        };	
 
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST', 
                body: data, 
                headers: {
                    'Content-Type': 'application/json;'
                }
            });
            const sucessfulPost = await response.json();
            console.log('Success:', sucessfulPost);
        } catch (error) {
            console.error('Could not POST new post. Error:', error);
        }
        updatePostTimeLine(newPost => [...newPost, data]) 
    }

    const textCounter = () => updateCounter(remainingChars - value.length);

    const submitOnEnter = e => {
        if(e.which === 13 && value !== ''){
            sendNewPost();
        } 
    }

    const handleOnClick = e => {
        if(value !== '') {
            sendNewPost();
        }
    }
    return(
        <StyledInputCtn> 
            <StyledInput
                aria-label="Text Area" 
                type="text" 
                maxLength={140} 
                placeholder="what's happening?" 
                onChange={e => setValue(e.currentTarget.value)}
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
                    : 'material-icons not-active'
                } 
                id="send">send</StyledSendIcon>
        </StyledButton>
    </StyledInputCtn>
)};

/**
 * propTypes for this component
 */

SubmitMessage.propTypes = {
    updatePostTimeLine: PropTypes.func,
  };

SubmitMessage.defaultProps = {
    updatePostTimeLine: () => {},
}
export default SubmitMessage;