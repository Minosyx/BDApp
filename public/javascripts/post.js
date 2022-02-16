function post() {
    $('#submit').on('click', async (event) => {

        event.preventDefault();
        var formData = $('#form').serialize();

        console.log(formData);

        var path = location.pathname;
        path = path.substring(0, path.lastIndexOf("/") + 1);

        $.post(path, formData, function() {
            console.log("Success");
        });
    });
}