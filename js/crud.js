class Drink {
  constructor(image, name, description) {
    this.image = image;
    this.name = name;
    this.description = description;

  }
}

class UI {
  static displayDrinks() {
    const drinks = Store.getDrinks();

    drinks.forEach((drink) => UI.addDrinkToList(drink));
  }

  static addDrinkToList(drink) {

    const drinksSection = document.querySelector('.drinks-container');

    let drinkContainer = document.createElement('div');

    drinkContainer.className = "drink-container";

    let drinksViewTemplate = `
      <img class="beer-image" alt="" src="${drink.image}">
      <div class="drink-name">${drink.name}</div>
      <div class="drink-text">${drink.description}</div>
      <div class="buttons">
        <input class="button delete" name="delete" type="submit" onclick="" value="delete">
        <input class="button" name="update" type="submit" onclick="" value="update">
      </div>
    `;

    drinkContainer.innerHTML = drinksViewTemplate;
    drinksSection.appendChild(drinkContainer);

  }

  static deleteDrink(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // id's thats gonna be in input form!!
  static clearFields() {
    document.querySelector('#drink-image').value = '';
    document.querySelector('#drink-name').value = '';
    document.querySelector('#drink-description').value = '';
  }

}


class Store {

  static getDrinks() {
    let drinks;
    if (localStorage.getItem('drinks') === null) {
      drinks = [];
    } else {
      drinks = JSON.parse(localStorage.getItem('drinks'));
    }

    return drinks;
  }

  static addDrink(drink) {
    const drinks = Store.getDrinks();
    drinks.push(drink);
    localStorage.setItem('drinks', JSON.stringify(drinks));
  }

  static removeDrink(name) {
    const drinks = Store.getDrinks();

    drinks.forEach((drink, index) => {
      if (drink.name === name) {
        drinks.splice(index, 1);
      }
    });

    localStorage.setItem('drinks', JSON.stringify(drinks));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayDrinks());

// Event: Add a Book
document.querySelector('#drink-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const image = document.querySelector('#drink-image').value;
  const name = document.querySelector('#drink-name').value;
  const description = document.querySelector('#drink-description').value;

  // Validate
  if (image === '' || name === '' || description === '') {
    // UI.showAlert('Please fill in all fields', );
    console.log('please fill fields');

  } else {
    // Instatiate book
    console.log(image, name, description);
    const drink = new Drink(image, name, description);

    // Add Book to UI
    UI.addDrinkToList(drink);

    // Add book to store
    Store.addDrink(drink);

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('.drinks-container ').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteDrink(e.target);

  // Remove book from store
  Store.removeDrink(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  // UI.showAlert('Book Removed', 'success');
});