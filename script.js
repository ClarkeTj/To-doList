const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.getElementById("lists");

function inputLength() {
  return input.value.trim().length;
}

function createListElement() {
  const li = document.createElement("li");
  li.textContent = input.value.trim();
  ul.appendChild(li);

  // Add task complete/remove logic
  li.addEventListener("click", function () {
    const finished = this.classList.toggle("done");

    if (finished && !li.querySelector("button")) {
      const removeButton = document.createElement("button");
      removeButton.textContent = "remove";
      removeButton.classList.add("deleteButton");
      li.appendChild(removeButton);

      removeButton.addEventListener("click", function (e) {
        e.stopPropagation(); // prevent triggering parent click
        li.classList.add("fade-out");
        setTimeout(() => li.remove(), 300);
      });
    } else {
      const btn = li.querySelector(".deleteButton");
      if (btn) btn.remove();
    }
  });

  // Visual pop animation on add
  li.style.animation = "pop 0.2s ease-out";

  // Clear input
  input.value = "";
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeydown(e) {
  if (inputLength() > 0 && (e.key === "Enter" || e.keyCode === 13)) {
    createListElement();
  }
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keydown", addListAfterKeydown);
