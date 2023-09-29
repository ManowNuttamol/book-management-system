const figlet = require("figlet");
const prompt = require("prompt-sync")({ sigint: true });
const alert = require("alert");
const inquirer = require("inquirer");
const chalk = require("chalk");

//Book Storage
let books = [
  { title: "Book1", author: "Author1", year: 2021, price: 500 },
  { title: "Book2", author: "Author2", year: 2022, price: 600 },
];

//Show all books in the system
function viewBooks(_callback) {
  let datas = books.values();
  for (let data of datas) {
    console.log(data);
  }
  _callback();
}

//Add book in the system
function addBook(_callback) {
  let add_title = prompt(
    `Please enter the ${chalk.green("title")} of the book you want to add: `,
    `Book${Object.keys(books).length + 1}`
  );
  let add_author = prompt(
    `Please enter the ${chalk.green("author")} of this book: `,
    "unknow"
  );
  let add_year = Number(
    prompt(
      `Please enter the ${chalk.green("year")} this book was published: `,
      "NaN"
    )
  );
  let add_price = Number(
    prompt(`Please enter the ${chalk.green("price")} of this book: `, "NaN")
  );
  books.push({
    title: add_title,
    author: add_author,
    year: add_year,
    price: add_price,
  });
  _callback();
}

//Update book information in the system
function editBook(_callback) {
  const edit = inquirer
    .prompt({
      name: "edit",
      type: "list",
      message: `Please choose ${chalk.yellow(
        "the title of the book you want to edit"
      )}: `,
      choices: books.map(function (item) {
        return item.title;
      }),
    })
    .then((answers) => {
      let index = books.findIndex((book) => book.title === answers["edit"]);
      console.log("Please correct this information");
      var edit_title = prompt(
        `Please enter the title of this book [${chalk.yellow(
          books[index]["title"]
        )}] : `,
        books[index]["title"]
      );
      var edit_author = prompt(
        `Please enter the author of this book [${chalk.yellow(
          books[index]["author"]
        )}] : `,
        books[index]["author"]
      );
      var edit_year = Number(
        prompt(
          `Please enter the year this book was published [${chalk.yellow(
            books[index]["year"]
          )}] : `,
          String(books[index]["year"])
        )
      );
      var edit_price = Number(
        prompt(
          `Please enter the price of this book [${chalk.yellow(
            books[index]["price"]
          )}] : `,
          String(books[index]["price"])
        )
      );
      var editdata = {
        title: edit_title,
        author: edit_author,
        year: edit_year,
        price: edit_price,
      };
      books[index] = editdata;
      _callback();
    });
}

//Delete book in the system
function deleteBook(_callback) {
  const del_title = inquirer
    .prompt({
      name: "del_title",
      type: "list",
      message: `Please choose ${chalk.red(
        "the title of the book you want to delete"
      )}: `,
      choices: books.map(function (item) {
        return item.title;
      }),
    })
    .then((answers) => {
      let index = books.findIndex(
        (book) => book.title === answers["del_title"]
      );
      books.splice(index, 1);
      _callback();
    });
}

//Exit the book-management system
function exit() {
  const status = inquirer
    .prompt({
      name: "status",
      type: "list",
      message: "Do you want to exit the book-management system: ",
      choices: ["Yes", "No"],
    })
    .then((answers) => {
      if (answers["status"] == "Yes") {
        console.log(
          `${chalk.red("Log out")} book-management-system successfully`
        );
      } else {
        manage();
      }
    });
}

//Menu in the system
function manage() {
  const command = inquirer
    .prompt({
      name: "command",
      type: "list",
      message: "Please choose the command you want to do: ",
      choices: [
        "viewBooks",
        "addBook",
        "editBook",
        "deleteBook",
        "exitProgram",
      ],
    })
    .then((answers) => {
      if (answers["command"] == "viewBooks") {
        viewBooks(function () {
          manage();
        });
      } else if (answers["command"] == "addBook") {
        addBook(function () {
          alert(`This book has been successfully added to the system`);
          manage();
        });
      } else if (answers["command"] == "editBook") {
        editBook(function () {
          alert(`This book has been successfully updated in the system`);
          manage();
        });
      } else if (answers["command"] == "deleteBook") {
        deleteBook(function () {
          alert(`This book has been successfully deleted from the system`);
          manage();
        });
      } else {
        exit();
      }
    });
}

//Command Line Interface (CLI)
figlet("book-management-system", function (err, data) {
  console.log(data);
  console.log(`${chalk.green("Log in")} book-management-system successfully`);
  manage();
});
