const thead = document.querySelector(".table-head");
thead.classList.add("text-center", "text-dark", "fs-6", "fw-normal");
const tbody = document.querySelector(".table-body");
tbody.classList.add("text-center");

function tr(elementName) {
  let ele = document.createElement(elementName);
  return ele;
}

function td(elementName, attribute, value, attribute1, value1, content) {
  let ele = document.createElement(elementName);
  ele.setAttribute(attribute, value);
  ele.setAttribute(attribute1, value1);
  ele.textContent = content;
  return ele;
}

function td1(elementName, content, attribute, value) {
  let ele = document.createElement(elementName);
  ele.setAttribute(attribute, value);
  ele.textContent = content;
  return ele;
}

let books = td("td", "class", "pb-2", "class", "fw-bold", "Books");
let author = td("td", "class", "pb-2", "class", "fw-bold", "Author");
let noOfpages = td("td", "class", "pb-2", "class", "fw-bold", "No. of Pages");
let isbn = td("td", "class", "pb-2", "class", "fw-bold", "ISBN");
let publisher = td("td", "class", "pb-2", "class", "fw-bold", "Publisher Name");
let release = td("td", "class", "pb-2", "class", "fw-bold", "Release Date");
let moreDetails = td("td", "class", "pb-2", "class", "fw-bold", "More Details");
thead.append(books, author, noOfpages, isbn, publisher, release, moreDetails);

async function loadTable() {
  try {
    const result = await fetch(`https://www.anapioficeandfire.com/api/books`);
    const books = await result.json();

    books.map((data) => {
      console.log(data);

      let tableRow = tr("tr");
      let bookName = td1("td", `${data.name}`);
      let authorName = td1("td", `${data.authors}`);
      let numberOfPages = td1("td", `${data.numberOfPages}`);
      let isbnNo = td1("td", `${data.isbn}`);
      let publisherName = td1("td", `${data.publisher}`);
      let releaseDate = td1("td", `${data.released}`);
      let btnView = td1("button", `Details`);
      let tableData = document.createElement("td");
      btnView.classList.add("btn", "btn-default", "btn-sm");
      btnView.setAttribute("data-bs-toggle", "modal");
      btnView.setAttribute("data-bs-target", "#exampleModal");
      btnView.addEventListener("click", () => {
        for (let i = 1; i <= data.length; i++) {
          fetch(`https://www.anapioficeandfire.com/api/books/${i}`)
            .then((data) => data.json())
            .then((data) => {
              let viewModalBody = document.getElementById("viewModalBody");
              let htmlContent = `Characters: ${data[i].characters}`;
              viewModalBody.innerHTML = htmlContent;
            })
            .catch();
        }
      });
      tableData.append(btnView);

      tableRow.append(
        bookName,
        authorName,
        numberOfPages,
        isbnNo,
        publisherName,
        releaseDate,
        tableData
      );

      tbody.append(tableRow);
    });
  } catch (error) {
    console.log(error);
  }
}

function search() {
  let books, filter, table, tr, td, txtValue;
  books = document.getElementById("myInput");
  filter = books.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

loadTable();
