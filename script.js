
"use strict";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Chatbot demo
// NOTE: This is a demo response system, not a real AI connection.
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = "message " +
    (type === "user" ? "user-message" : "bot-message");

  if (type === "user") {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    message.appendChild(paragraph);
  } else {
    const avatar = document.createElement("span");
    avatar.className = "mini-avatar";
    avatar.textContent = "✿";

    const content = document.createElement("div");
    content.className = "message-content";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.appendChild(paragraph);
    message.append(avatar, content);
  }

  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getDemoReply(message) {
  const text = message.toLowerCase();

  if (/\b(hello|hi|hey|namaste|नमस्ते|हेलो)\b/.test(text)) {
    return "Namaste! I can share general wellness information. Ask me about sleep, hydration, exercise or healthy habits.";
  }

  if (text.includes("sleep") || text.includes("neend") ||
      text.includes("नींद")) {
    return "For better sleep, try a regular bedtime, a calm sleeping environment and less screen time before bed. If sleep problems continue, talk to a healthcare professional.";
  }

  if (text.includes("water") || text.includes("hydration") ||
      text.includes("pani") || text.includes("पानी")) {
    return "Drink water regularly through the day. Your needs can vary with weather, activity and health. Do not force excessive water intake.";
  }

  if (text.includes("exercise") || text.includes("fitness") ||
      text.includes("activity") || text.includes("व्यायाम")) {
    return "Choose enjoyable activities such as walking, cycling or playing a sport. Start comfortably and adapt activity to your abilities.";
  }

  if (text.includes("fever") || text.includes("bukhar") ||
      text.includes("बुखार") || text.includes("pain") ||
      text.includes("dard") || text.includes("दर्द") ||
      text.includes("symptom") || text.includes("symptoms")) {
    return "Symptoms can have many different causes, and this demo cannot assess or diagnose them. Rest and fluids may help in some situations. If symptoms are severe, sudden, worsening or persistent, seek medical care.";
  }

  if (text.includes("stress") || text.includes("anxiety") ||
      text.includes("tension")) {
    return "A short break, slow comfortable breathing, talking to someone you trust and keeping a regular routine may help with everyday stress. Seek support if it feels overwhelming or continues.";
  }

  if (text.includes("healthy") || text.includes("health") ||
      text.includes("diet") || text.includes("food")) {
    return "General wellness includes balanced meals, regular sleep, enjoyable physical activity and social connection. Individual needs differ, so a qualified professional can help with personal concerns.";
  }

  return "Thanks for your question. This is currently a demo chatbot, not a connected AI model, so I cannot generate a personalised answer yet. You can ask about sleep, hydration, exercise or healthy habits.";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  window.setTimeout(() => {
    addMessage(getDemoReply(message), "bot");
  }, 350);
});

// Quick prompt buttons
document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    userInput.value = button.dataset.prompt;
    chatForm.requestSubmit();
    userInput.focus();
  });
});

// Symptom information: educational, not diagnostic
const symptomInfo = {
  "Fever": {
    causes: "Fever may occur with infections and other conditions.",
    advice: "Rest, drink fluids as appropriate and monitor how you feel. Seek professional advice if the fever persists or you are concerned."
  },
  "Cough": {
    causes: "Cough can be associated with a cold, allergies or other respiratory conditions.",
    advice: "Drink fluids and avoid smoke or other irritants. Seek care if it persists, worsens or comes with breathing difficulty."
  },
  "Headache": {
    causes: "Headaches may be related to sleep, stress, dehydration or other causes.",
    advice: "Rest somewhere comfortable and drink water if you may be thirsty. Sudden severe headache or headache with concerning symptoms needs urgent medical assessment."
  },
  "Stomach pain": {
    causes: "Stomach pain has many possible causes, including indigestion and infections.",
    advice: "Notice whether the pain improves or worsens. Severe, sudden or worsening pain needs urgent medical assessment."
  },
  "Fatigue": {
    causes: "Fatigue may be associated with sleep difficulties, stress, illness or other factors.",
    advice: "Try a regular sleep routine and balanced meals. Seek professional advice if fatigue persists or affects daily life."
  }
};

const symptomForm = document.getElementById("symptomForm");
const symptomResult = document.getElementById("symptomResult");

symptomForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selected = Array.from(
    symptomForm.querySelectorAll('input[name="symptom"]:checked')
  ).map((input) => input.value);

  symptomResult.replaceChildren();
  symptomResult.classList.add("visible");

  if (selected.length === 0) {
    symptomResult.textContent = "Please select at least one symptom.";
    return;
  }

  const title = document.createElement("strong");
  title.textContent = "General health information";
  symptomResult.appendChild(title);

  selected.forEach((symptom) => {
    const info = symptomInfo[symptom];
    if (!info) return;

    const heading = document.createElement("h4");
    heading.textContent = symptom;

    const causes = document.createElement("p");
    causes.textContent = "Possible causes: " + info.causes;

    const advice = document.createElement("p");
    advice.textContent = "General guidance: " + info.advice;
    advice.style.marginTop = "7px";

    symptomResult.append(heading, causes, advice);
  });

  const warning = document.createElement("p");
  warning.className = "result-warning";
  warning.textContent =
    "This tool does not diagnose illness. For personal advice, contact a qualified healthcare professional.";
  symptomResult.appendChild(warning);
});

// BMI calculator
const bmiForm = document.getElementById("bmiForm");
const bmiResult = document.getElementById("bmiResult");

bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const weight = Number(document.getElementById("weight").value);
  const heightCm = Number(document.getElementById("height").value);

  bmiResult.replaceChildren();
  bmiResult.classList.add("visible");

  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(heightCm) ||
    weight <= 0 ||
    heightCm <= 0 ||
    weight > 500 ||
    heightCm > 250 ||
    heightCm < 30
  ) {
    bmiResult.textContent = "Please enter valid height and weight values.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  const heading = document.createElement("h3");
  heading.textContent = "Your calculated BMI: " + bmi.toFixed(1);

  const explanation = document.createElement("p");
  explanation.textContent =
    "BMI is a screening measurement, not a diagnosis. For adults, common BMI ranges can provide general context. For anyone under 20, interpretation requires age- and sex-specific growth charts.";

  bmiResult.append(heading, explanation);
});

// Language toggle: switches the introductory greeting and input hint.
let hindiMode = false;
const languageToggle = document.getElementById("languageToggle");

languageToggle.addEventListener("click", () => {
  hindiMode = !hindiMode;

  const greeting = chatBox.querySelector(".bot-message .message-content p");
  if (greeting) {
    greeting.textContent = hindiMode
      ? "Namaste! Main HealthAI hoon. Aap general wellness, neend, paani aur healthy habits ke baare mein pooch sakte hain."
      : "I'm HealthAI, your health information assistant. You can ask about general wellness, symptoms, sleep, or healthy habits.";
  }

  userInput.placeholder = hindiMode
    ? "Apni wellness ke baare mein poochhein..."
    : "Ask HealthAI about your wellness...";

  languageToggle.textContent = hindiMode ? "हिंदी / EN" : "EN / हिंदी";
});
