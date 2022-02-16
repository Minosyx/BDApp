function prepare_and_post() {
    $('#submit').on('click', async (event) => {

        event.preventDefault();
        var formData = {
            products: []
        }

        $("input[name^=products").each(function() {
            formData.products.push($(this).val());
        });

        var path = location.pathname;
        path = path.substring(0, path.lastIndexOf("/") + 1);

        $.post(path, formData, function() {
            console.log("Success");
        });
    });
}

var i = 1;

function add_product(){
    var label = document.createElement('label');
    label.setAttribute('for', `product${i}`);
    label.textContent = 'ID Produktu ';
    var input = document.createElement('input');
    input.id = `product${i}`;
    input.name = 'products';
    input.type = 'number';
    input.setAttribute('min', 1);
    var br = document.createElement('br');

    $(`#product${i - 1}`).after(br, label, input);
    i++;
}