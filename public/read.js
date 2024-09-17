const socket = io('https://bookish-halibut-v979x9gr97wfxx5g-8080.app.github.dev/');

window.onload = async () => {
		try {
				let response = await fetch('https://bookish-halibut-v979x9gr97wfxx5g-8080.app.github.dev/chat/datas');
				if (!response.ok) {
						throw new Error('Network response was not ok');
				}
				let datas = await response.json();
				console.log(datas);

				const chat = sessionStorage.getItem("Chat");
				const bigDiv = document.getElementById("bigDiv");
				if (datas[chat]) {
						for (let doc of datas[chat]) {
								let last = doc._id;
								const DIV = document.createElement("div");
								DIV.id = doc._id;
								DIV.classList.add(doc.Name, "Message");
								bigDiv.appendChild(DIV);

								const container = document.getElementById(doc._id);
								const User = document.createElement("h6");
								User.id = doc._id + "User";
								User.classList.add(doc.Name + "User", "Message");
								User.innerHTML = doc.User;
								container.appendChild(User);

								const Message = document.createElement("p");
								Message.id = doc._id + "Text";
								Message.classList.add(doc.Name + "Text", "Message");
								Message.innerHTML = doc.Message;
								container.appendChild(Message);

								window.location.href = "#" + last;
						}
				} else {
						console.error("Chat not found in datas");
				}
		} catch (error) {
				console.error("Error fetching data:", error);
		}
}

socket.on('broadcastMessage', (doc) => {
	console.log("New broadcastMessage");
	if (doc["Chat"] == sessionStorage.getItem("Chat")) {
			const bigDiv = document.getElementById("bigDiv");
			const DIV = document.createElement("div");
			DIV.id = doc._id;
			DIV.classList.add(doc.Name, "Message");
			bigDiv.appendChild(DIV);

			const container = document.getElementById(doc._id);
			const User = document.createElement("h6");
			User.id = doc._id + "User";
			User.classList.add(doc.Name + "User", "Message");
			User.innerHTML = doc.User;
			container.appendChild(User);

			const Message = document.createElement("p");
			Message.id = doc._id + "Text";
			Message.classList.add(doc.Name + "Text", "Message");
			Message.innerHTML = doc.Message;
			container.appendChild(Message);

			// Scroll to the bottom of bigDiv
			bigDiv.scrollTop = bigDiv.scrollHeight;
	}
});