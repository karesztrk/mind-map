---
tags: javascript, js, event, element, trick
---


```
<!DOCTYPE html>
<html>
<head>
  <title>Event Logging</title>
  <style>
    .event-log {
      height: 200px;
      overflow: auto;
      border: 1px solid #ccc;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="event-log"></div>

  <button id="myButton">Click Me</button>

  <script>
    // Get the element
    const myElement = document.getElementById('myButton');

    // Create an event log container element
    const eventLog = document.querySelector('.event-log');

    // Function to log events
    function logEvent(event) {
      eventLog.innerHTML += `<p>${event.type}</p>`;
      eventLog.scrollTop = eventLog.scrollHeight;
    }

    // Attach a wildcard event listener to capture all events
    for (const eventType in window) {
      if (eventType.startsWith('on')) {
        myElement.addEventListener(eventType.slice(2), logEvent);
      }
    }

  </script>
</body>
</html>

```