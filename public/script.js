//position entire app, css animation

//refactor onEnter
//console.log post
//div into react

window.onload = () => {
	console.log('My Express React Webpack Babel Setup');
async function getUserData() { 
	await fetch('http://localhost:3000/api/users')
	.then(resp => resp.json())
	.then(data => {
		let posts = data.posts;
		let users = data.users;
		console.log(data)
		
		posts.map(post => {
		
			let postCtn = document.querySelector('.post-ctn')
			let msgInfoCtn = document.createElement('div')
			msgInfoCtn.classList.add("msg-info-ctn")
			let divPost = document.createElement('div');
			divPost.classList.add("post")
			divPost.innerHTML = `${post.message}`

			let divUserName = document.createElement('div');
			divUserName.classList.add("username-ctn")

			let userAvatar = document.createElement('img');
			userAvatar.classList.add("img-ctn")

			let userTs = document.createElement('div');
			userTs.classList.add("ts-ctn")
				
			if(post.user == 1){
				divUserName.innerHTML = `${users[0].real_name} ${'- @' + users[0].username}`
				userAvatar.src = "/images/marymeeker.jpg";
				userAvatar.alt = "marymeeker";
				userTs.innerHTML = converUnixTimeStamp(post.ts)
			} else if(post.user == 2) {
				divUserName.innerHTML = `${users[1].real_name} ${'- @' + users[1].username}`
				userAvatar.src = "/images/ConanOBrien.jpg";
				userAvatar.alt = "ConanOBrien";
				userTs.innerHTML = converUnixTimeStamp(post.ts)
			} else if(post.user == 3) {
				divUserName.innerHTML = `${users[2].real_name} ${'- @' + users[2].username}`
				userAvatar.src = "/images/baratunde.jpg";
				userAvatar.alt = "baratunde";
				userTs.innerHTML = converUnixTimeStamp(post.ts)
			} else {
				console.log('user does not exist');
			}
			postCtn.appendChild(msgInfoCtn);	
			msgInfoCtn.append(userTs, userAvatar, divUserName);	
			postCtn.append(divPost);
			})	
		});
}		
getUserData();		
	
const textCounter = (e) => {
		let input, countRemaining, counter;
		input = document.getElementById('messenger').value;
		counter = (140 - (input.length));
		countRemaining = document.getElementById('charactersRemaining'); 
		countRemaining.textContent = counter;  
	}
	document.getElementById('messenger').addEventListener('keyup', textCounter, false);

	const converUnixTimeStamp = (unixTimeStamp) => {
		let date = new Date(unixTimeStamp*1000);
		let hours = date.getHours();
		let minutes = "0" + date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; 
		minutes = minutes < 10 ? '0'+minutes : minutes;
		return hours + ':' + minutes.substr(-2) + ' ' + ampm;
	
	}	
}

const submitOnEnter = e => {
	let input = document.getElementById('messenger');
		if(e.which === 13 && input.value !== '' ){
			e.preventDefault();
			displayNewPost(input.value)
			sendNewPost(input.value);
		}	
}

const submitMessage = e => {
	let input = document.getElementById('messenger');
		if(input.value !== '' ){
			displayNewPost(input.value)
			sendNewPost(input.value);
		}	
	 else {
		alert('You have not typed anything, silly!');
	}
}



const displayNewPost = (value) => {
	let newPostMessage = document.createElement('div');
	let postCtn = document.querySelector('.post-ctn')
		newPostMessage.classList.add("post") 
		newPostMessage.setAttribute("id", "new-post-message")
		newPostMessage.innerHTML = `${value}`
	
	let newPostAvatar = document.createElement('img');
	newPostAvatar.src = "/svgs/better-icon.svg";
	newPostAvatar.alt = "better-icon";
	newPostAvatar.classList.add("img-ctn")
	newPostAvatar.setAttribute("id", "new-post-avatar")
	
	postCtn.append(newPostMessage, newPostAvatar);
}

async function sendNewPost(value) {
	const date = new Date();
	const data = { 
		id: 1,
		message: `${value}`,
		user: 4,
		ts: date.getTime()
	};	

	try {
		const response = await fetch('http://localhost:3000/api/posts', {
			method: 'POST', 
			body: JSON.stringify(data), 
			headers: {
				'Content-Type': 'application/json;'
			}
		});
		const json = await response.json();
		console.log('Success:', json);
	} 
	
	catch (error) {
		console.error('Error:', error);
	}
	
}

const userActiveSince = (date) => {
	let activeInfo  = document.createElement('div');
	let post = document.querySelector('.post-ctn');
	activeInfo.setAttribute("id", "active-info");


	
		let cal = document.createElement('img');
		cal.src = "/svgs/calendar-icon.svg";
		cal.alt = "calendar-icon";
		cal.setAttribute("id", "calendar-icon");
	post.appendChild(activeInfo, cal)	
}

userActiveSince()





