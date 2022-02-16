function get() {
    $('#submit').on('click', async (event) => {

        event.preventDefault();
        var formData = new FormData($('#form')[0]);
        var id = formData.get('id');
        console.log(id);

        var path = location.pathname;
        path = path.substring(0, path.lastIndexOf("/") + 1);

        $.get(path + `${id}`, function() {
            window.location.href = path + `/${id}`;
        });
    });
}