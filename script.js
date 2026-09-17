const topicInput = document.getElementById("topic");
const factButton = document.getElementById("factButton");
const result = document.getElementById("result");

factButton.addEventListener("click", async () => {

    const topic = topicInput.value.trim();

    if (!topic) {
        result.innerText = "Please enter a topic.";
        return;
    }

    result.innerText = "Thinking...";

    try {

        const response = await fetch("/fun-fact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic: topic
            })

        });

        const data = await response.json();

        result.innerText = data.fact;

    } catch (error) {

        console.log(error);

        result.innerText =
            "Unable to connect to the server.";

    }

});