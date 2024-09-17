let User = "";
let Chat = "";
let Message = "";

function handleForm(event) {
  event.preventDefault();
	const User = document.getElementById('username').value;
  const Name = FBI(User);
  let Chat = FBI(document.getElementById('chatroom').value);
  sessionStorage.setItem("User", User);
  sessionStorage.setItem("Chat", Chat);
	sessionStorage.setItem("Name", Name);
	window.location.href = '/chat';
}

async function handleForm2(event){
  event.preventDefault();
  Message = document.getElementById('message').value;
  document.getElementById('message').value = "";
  User = sessionStorage.getItem("User");
  Name = sessionStorage.getItem("User");
  Chat = sessionStorage.getItem("Chat");

  const bigDiv = document.getElementById("bigDiv");
  var data = {User, Name, Chat, Message};

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log('Data successfully sent to the server: ', data);
    } else {
      console.error('Error posting data:', response.statusText);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }

  // Scroll to the bottom of bigDiv
  bigDiv.scrollTop = bigDiv.scrollHeight;
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', handleForm);
  }
  else if (document.getElementById("sender")){
    document.getElementById("sender").addEventListener("submit", handleForm2)
  }
});

function FBI(username){
	const lower = [...'abcdefghijklmnopqrstuvwxyz'];
	const upper = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	const numbers = [..."0123456789"];
	const allowedChars = [...lower, ...upper, ...numbers];
	
	let name = "";
	for (let i in username) {
		if (allowedChars.includes(username[i])) {
			name = name + username[i];
		}
	}
	for (let num of numbers){
		if (name.startsWith(num)){
			name = name.slice(1);
			break
		}
	}
	return name;
}

   