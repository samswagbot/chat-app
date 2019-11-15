import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime } from "luxon";

const StyledUserNameCtn = styled.div`
    
    display: flex;
`; 

const StyledAvatar = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;   
`
const StyledUserName = styled.div`
    background-color: white;
    font-size: 10px;
    justify-content: center;
    display: flex;
`
const StyledTsCtn = styled.div`
    font-size: 10px;
`
const StyledPostMessage = styled.div`

&:hover + show{
    background-color: rgb(37, 23, 58);
    color: white;
}

    &.hide {
        display: none;
    }

    &.show {
        display: flex;
        background-color: rgb(246, 246, 246);
        border-radius: 5px;
        font-size: 12px;
        color: rgb(53, 40, 73);
        align-self: center;
        padding: 14px;
        line-height: 17px;
       
    }
`
const StyledCalenderIcon = styled.img`
    height: 12px;
    color: white;
`
const StyledPostCtn = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    align-self: center
`

const Timeline = ({ posts, userMap, active, setActive}) => {
    const displayActiveUser = e => {
        if(e.currentTarget) {
            setActive(!active)
        }
    }
    
    const convertTimeStamp = time => {
        let date = DateTime.fromMillis(time*1000);
        if(active){
            return `${`active since ` + date.toFormat('DDD')}`;
        } else {
            return date.toFormat('t'); 
        }
    }
    
    return (
        <React.Fragment>
            {posts.map((post, key) => 
                    <StyledPostCtn key={key}>
                        <StyledAvatar
                                src={userMap[post.user].avatar} 
                                alt={userMap[post.user].real_name}
                        /> 
                       <StyledPostMessage 
                            // onMouseEnter={displayActiveUser}
                            // onMouseLeave={displayActiveUser} 
                            className={!active ? 'show': 'hide'}
                        >
                            { post.message } 
                        </StyledPostMessage>
                        <StyledUserNameCtn>
                            <StyledUserName>
                                {userMap[post.user].username} 
                            </StyledUserName>
                            <StyledTsCtn>
                                {convertTimeStamp(post.ts)} 
                            </StyledTsCtn>   
                        </StyledUserNameCtn>
                        <StyledPostMessage
                            className={active ? 'show': 'hide'}
                        >
                        <StyledCalenderIcon src={userMap[post.user].cal} alt="cal-icon"/>
                            {convertTimeStamp(post.ts)} 
                        </StyledPostMessage> 
                    </StyledPostCtn>
                )}
        </React.Fragment>
    )

}

Timeline.propTypes = {
    posts: PropTypes.array.isRequired,
    userMap: PropTypes.object.isRequired,
};
export default Timeline