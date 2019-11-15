import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime } from "luxon";

const StyledPost = styled.div`
    background-color: rgb(46,197, 155);
    flex-direction: column;
    justify-content: space-evenly;
    padding: 15px 10px;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 12px;
    color: white;
    text-align: right;

    &:hover {
        background-color: rgb(37, 23, 58);
        color: white;
    }
    &.hide {
        display: none;   
    }
    
    &.show {
        display: flex;
    }
`
const StyledMsgInfoCtn = styled.div`
    position: absolute;
`; 

const StyledImgCtn = styled.img`
    height: 40px;
    width: 40px;
    background-color: rgb(37, 23, 58);
    width: 18px;
    border-radius: 50%;
    padding: 0px 11px;
    
`
const StyledTsCtn = styled.div`
    font-size: 10px;
`

const NewPost = ({ newPost, active }) => {
    const convertTimeStamp = time => {
        let date = DateTime.fromMillis(time);
        if(active){
            return `${`active since ` + date.toFormat('DDD')}`;
        } else {
            return date.toFormat('t'); 
        }
    }
    return (
        <React.Fragment>
            {newPost.map((index ,key) =>
                <React.Fragment key={key}>
                    <StyledMsgInfoCtn>        
                        <StyledImgCtn
                            src="/svgs/better-icon.svg" 
                            alt="better-icon"
                        />
                        <StyledTsCtn>
                            {convertTimeStamp(index.posts.ts)} 
                        </StyledTsCtn>   
                    </StyledMsgInfoCtn>
                <StyledPost>
                    {index.posts.message}
                </StyledPost>   
                </React.Fragment>    
            )}
        </React.Fragment>
)};
/**
 * propTypes for this component
 */

NewPost.propTypes = {
    newPost: PropTypes.array.isRequired
  };

export default NewPost
