function put(req_type) {
    $('#submit').on('click', async (event) => {

        event.preventDefault();
        var id = $('#id').val();

        var path = location.pathname;
        path = path.substring(0, path.lastIndexOf("/") + 1);

        var data;
        
        if (req_type == 'product'){
            data = {
                id: id,
                name: $('#name').val(),
                category: $('#category').val(),
                cost: $('#cost').val()
            }
        } else {
            data = {
                id: id,
                products: []
            }
            $("input[name^=products").each(function() {
                data.products.push($(this).val());
            });
        }

        $.ajax({
            type: 'PUT',
            url: path + `${id}`,
            dataType: 'json',
            data: data,
            encode: true
        }).done(() => {
            console.log("SUCCESS");
        }).fail(() => {
            console.log("FAILURE");
        })
    });
}