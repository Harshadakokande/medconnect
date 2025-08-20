// Elements
const chatbot = document.getElementById("chatbot");
const toggleBtn = document.getElementById("toggle-chat");
const closeBtn = document.getElementById("close-chat");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-message");

// Toggle chat
toggleBtn.addEventListener("click", () => chatbot.classList.toggle("hidden"));
closeBtn.addEventListener("click", () => chatbot.classList.add("hidden"));

// Send on button
sendBtn.addEventListener("click", sendMessage);
// Send on Enter
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Helper: add message bubble
function addBubble(text, sender = "bot") {
  const wrap = document.createElement("div");
  wrap.className = sender === "user" ? "text-right mb-2" : "text-left mb-2";
  const bubble = document.createElement("span");
  bubble.className =
    sender === "user"
      ? "inline-block bg-blue-100 px-3 py-2 rounded-lg"
      : "inline-block bg-gray-200 px-3 py-2 rounded-lg";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Very simple rule-based “AI” (placeholder)
function medBotReply(message) {
  const m = message.toLowerCase();

  // Greetings
  if (/(hi|hello|hey)\b/.test(m)) {
    return "Hi! I’m MedBot. Tell me your symptoms or type 'book' to schedule an appointment.";
  }

  // Appointment intent
  if (/\b(book|appointment|schedule)\b/.test(m)) {
    return "Great! Please share your name, preferred date & time, and a contact number. Our team will confirm shortly.";
  }

  // Emergency disclaimer
  if (/\b(emergency|severe|bleeding|unconscious|chest pain)\b/.test(m)) {
    return "This sounds urgent. Please call your local emergency number immediately or visit the nearest hospital.";
  }

  // Simple symptom hints (not medical advice)
  if (/\bfever|temperature|hot|chills\b/.test(m)) {
    return "For fever: rest, hydrate, and consider paracetamol as per label dosing. If fever persists >48 hours or >102°F (38.9°C), consult a doctor.";
  }
  if (/\bcough|cold|sore throat|congestion\b/.test(m)) {
    return "For cough/cold: warm fluids, steam inhalation, and rest may help. If symptoms persist or worsen, book an online consult.";
  }
  if (/\bheadache|migraine\b/.test(m)) {
    return "For headaches: hydrate, rest, and avoid screens. Persistent or severe headaches should be evaluated by a clinician.";

  }

  // Default
  return "I understand. Could you describe your symptoms, duration, and any medications taken? (Note: This chat is informational, not a medical diagnosis.)";
}

// Send message handler
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addBubble(text, "user");
  userInput.value = "";
  setTimeout(() => addBubble(medBotReply(text), "bot"), 400);
}
