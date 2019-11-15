import React from 'react';
import Post from './components/Posts';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        posts: [],
        users: [],
        userMap: {}
    }
  };

 componentDidMount() { 
    this.fetchUsers()
  }

async fetchUsers() {
  try {
      const res = await fetch('http://localhost:3000/api/users');
      const json = await res.json();
      this.setState({posts: json.posts, users: json.users});
      this.createUserMap();
  }
  catch {
    console.error('Could not fetch users data. Error:', error);
  }
}

createUserMap() {
  const { users } = this.state;
    users.forEach((user) => {
      let u  = user;
      u.avatar = `/images/${user.username}.jpg`           
      u.cal = `/svgs/calendar-icon.svg`
      u.username = `${user.real_name} ${`- @` + user.username}`
      this.setState(prevState => { 
        let userMap = Object.assign({}, prevState.userMap);  
        userMap[user.id] = u                              
        return { userMap }
      }) 
  })
}

render() {
  const { 
    posts, 
    userMap, 
    users 
  } = this.state;
  
    return (
      <React.Fragment>
        {Object.keys(userMap).length == users.length && posts.length > 0 &&
          <Post posts={posts} userMap={userMap}/>
        }
      </React.Fragment>
    );
  }
}
export default App;

