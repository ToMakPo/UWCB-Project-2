$.get("/api/user_data").then(data => {
  const text =
    "id " +
    data.id +
    " " +
    " email : " +
    data.email +
    " name :" +
    data.first_name;
  $("#welcome").text(text);

  userBooks(data.id);
});

async function userBooks(userId) {
  const data = await $.get(`/api/bookList/${userId}`);
  console.log(data.length);

  for (i = 0; i < data.length; i++) {
    const googleId = data[i].google_book_id;

    const queryURL = `https://www.googleapis.com/books/v1/volumes/${googleId}`;
    const books = await $.ajax({ url: queryURL, method: "GET" });
    console.log(books);
    console.log(books.volumeInfo.title);

    const check = await $.get(`/api/check/${userId}/${googleId}`);
    let flex = "";
    if (check[0].completed === true) {
      flex = "flexCheckChecked";
    }

    const html = `
      <div class="card w-25 p-3" style="max-height: 600px">
        <div class="flex-column">
          <div class="">
            <img class="" style="max-height: 200px" src="${books.volumeInfo.imageLinks.smallThumbnail}" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">${books.volumeInfo.title}</h5>
            <p class="card-text">Finished reading :  <input class="form-check-input completed" value="" data-google=${googleId} data-completed=${data[i].completed} type="checkbox" id=${flex} checked></p>
            <p class="card-text">ranking : ${data[i].ranking}</p>
            <button class="btn btn-primary burn-book-delete" data-googleId=${googleId}>Burn Book</button>
          </div>
        </div>
      </div>
    `;

    $(".book-display").append(html);
  }
}

$(".book-display").on("click", ".completed", async function() {
  const googleId = $(this).attr("data-google");

  const isCompleted = $(this).attr("data-completed");

  console.log(isCompleted);
  if (isCompleted === "false") {
    $.ajax("/api/bookList/" + googleId + "/1", {
      type: "PUT",
      data: 1
    })
      .then(() => {
        console.log("checked");
      })
      .catch(err => {
        console.log(err);
      });

    $(this).attr("data-completed", "true");
  }
  if (isCompleted === "true") {
    $.ajax("/api/bookList/" + googleId + "/0", {
      type: "PUT",
      data: 0
    })
      .then(() => {
        console.log("unChecked");
      })
      .catch(err => {
        console.log(err);
      });

    $(this).attr("data-completed", "false");
  }
});

$(".book-display").on("click", ".burn-book-delete", async function() {
  const googleId = $(this).attr("data-googleId");

  const { id } = await $.get("/api/user_data");

  $.ajax("/api/bookList/" + googleId + "/" + id, {
    type: "DELETE"
  }).then(() => {
    console.log("deleted");
    location.reload();
    //  $(this).parent().parent().remove()
  });
});
