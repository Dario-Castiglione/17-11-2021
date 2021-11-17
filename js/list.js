import { render, API } from "./utils.js";

const List = (data) => {
  const elements = data
    .map(
      (item) => `
      <div class="scheda">

      <img src="${item.poster}" alt="${item.title}">
      <button class="delete" id="${item.id}"> x </button>
      <a class="edit" href="#edit-${item.id}">✏️</a>
      <p><strong>${item.title}<br></strong>${item.description.slice(0,200)}
      </BR>
      ...
      </p>
      </div>`
      )
      .join("");
      const container = document.querySelector("#container");
      render(
        container,
        `
        ${elements}
        <a href="#add" class="pulsante" id="add">Aggiungi una nuova scheda</a>
        `
        );
        
       
  const btns = [...document.querySelectorAll(".delete")];
  console.log(btns)
  const deleteItem = (event) => {
    console.log(event.target)
    const id = parseInt(event.target.id);
    const filtered = data.filter((movie) => movie.id !== id);

    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => List(filtered));
  };

  const btnClicks = (btn) => btn.addEventListener("click", deleteItem, { once: true });

  btns.forEach(btnClicks);
};

export { List };
