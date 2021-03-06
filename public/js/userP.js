$.get("/api/user_data").then(data => {
  userBooks(data.id);
});

async function userBooks(userId) {
  const data = await $.get(`/api/bookList/${userId}`);

  for (i = 0; i < data.length; i++) {
    const bookId = data[i].google_book_id;

    const queryURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    const books = await $.ajax({ url: queryURL, method: "GET" });

    const check = await $.get(`/api/check/${userId}/${bookId}`);
    let flex = "";
    if (check[0].completed === true) {
      flex = "flexCheckChecked";
    }

    const html = `
      <div class="card p-3 col-sm-12 col-md-6 col-lg-3" style="max-height: 600px">
        <div class="flex-column">
          <div>
            <img style="max-height: 200px" src="${books.volumeInfo.imageLinks.smallThumbnail}" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">${books.volumeInfo.title}</h5>
            <p class="card-text">Finished reading :  <input class="form-check-input completed" value="" data-google=${bookId} data-completed=${data[i].completed} type="checkbox" id=${flex} checked></p>
            <select data-google=${bookId} class="form-select" aria-label="Default select example">
            <option selected >Rank the book</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br>
            <a class="btn" href="/bookPage?bookId=${bookId}">See Book Info</a>
            <button class="btn burn-book-delete" data-googleId=${bookId}>Recycle Book</button>
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

$(".book-display").on("change", ".form-select", async function() {
  console.log("changed");
  const { id } = await $.get("/api/user_data");

  console.log($(this).val());
  const ranking = parseInt($(this).val());
  const rank = {
    userProfileId: id,
    ranking: ranking
  };
  const googleId = $(this).attr("data-google");

  $.ajax("/api/rank/" + googleId, {
    type: "PUT",
    data: rank
  })
    .then(() => {
      console.log("ranked");
    })
    .catch(err => {
      console.log(err);
    });
});
