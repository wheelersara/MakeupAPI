
const getProducts = () => {
let productType = $("#productType").val().toLowerCase();
$.ajax({
    type: "GET",
    url: "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + productType,
    dataType: "json",
    success: function (result) {
    process(result);
    },
    error: function (xhr, status, error) {
        alert(
        "Result: " +
            status +
            " " +
            error +
            " " +
            xhr.status +
            " " +
            xhr.statusText
        )

        $(".allProducts").append(`
            <div class="card">
                <img src="default.jpg" width="150px"/>
            </div>
        `);

        
}
});
};

const getProductList = () => {
    $("nav").empty();
    productTypes.forEach(productType => {
    $("nav").append(`<p>${productType.name}</p>`);
    });
};


const process = (products) => {
    $(".allProducts").empty();
    if (products.length === 0) {
        $(".allProducts").append("<p>No products found.</p>");
        return;
    }

    products.forEach(product => {
        let displayPrice = "Price Unavailable";
        if (product.price != null && product.price != 0.0) {
            displayPrice = `$ ${product.price}`;
        }

        $(".allProducts").append(`
            <div class="card">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: ${displayPrice}</p>
                <img src="${product.image_link}" onerror="this.src='default.jpg'" width="150px"/>
            </div>
        `);
    });
};


$(document).ready(() => {
    getProductList()
});

$(document).ready(() => {
    $("#getProductsButton").on("click", getProducts);
});
