const roastText = document.getElementById("roastText");
const roastBtn = document.getElementById("roastBtn");

const roasts = [
  "I’d roast you but my oven is full of problems you created.",
  "You’re not stupid—you just have bad luck thinking.",
  "You have the confidence of someone who fails every group project.",
  "If common sense was money, you'd be broke.",
  "You don’t need a GPS… you’re already lost in life.",
  "You're like a cloud. Once you disappear, it's a beautiful day.",
  "You bring everyone so much joy… when you leave the room.",
  "You're not useless. You could serve as a bad example.",
  "If being annoying was a sport, you'd have 10 gold medals."
];

roastBtn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * roasts.length);
  roastText.textContent = roasts[random];
});
