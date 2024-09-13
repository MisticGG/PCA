const socket = io('https://937ce922-531a-467d-8897-68fe4b248773-00-1yu7q9n8uur5p.picard.replit.dev:8080/');

window.onload = async () => {
		try {
				let response = await fetch('https://937ce922-531a-467d-8897-68fe4b248773-00-1yu7q9n8uur5p.picard.replit.dev:8080/chat/datas');
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
		let bottom = false;
		console.log("New broadcastMessage");

		if (doc["Chat"] == sessionStorage.getItem("Chat")) {
				const bigDiv = document.getElementById("bigDiv");
				if ((bigDiv.scrollTop + bigDiv.clientHeight) >= bigDiv.scrollHeight) {
						bottom = true;
				}

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

				if (bottom) {
						console.log("Scroll to bottom");
						DIV.scrollIntoView();
						bottom = false;
				}
		}
});
