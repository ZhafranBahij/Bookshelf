document.addEventListener("DOMContentLoaded", function () {
    
    const submitForm = document.getElementById("form");
    
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const filter = document.getElementById("searching");
    filter.addEventListener("submit", function (event) {
        event.preventDefault();
        findIt();
    });

    if(isCanStorage()){
        loadData();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshData();
});