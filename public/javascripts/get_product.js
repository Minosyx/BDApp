$(window).on('load', () => {
    $('#id').val(null);
    $('#name').val(null);
});

$(window).on('load',
    function get() {
        $('#submit').on('click', async (event) => {

            event.preventDefault();
            var formData = new FormData($('#form')[0]);
            var id = formData.get('id');
            var name = formData.get('name');
            var path = location.pathname;
            path = path.substring(0, path.lastIndexOf("/") + 1);

            if (name == null)
                $.get(path + `${id}`, function() {
                    window.location.href = path + `/${id}`;
                });
            else if (id == null)
                $.get(path + `name/${name}`, function() {
                    window.location.href = path + `/name/${name}`;
                });
        });
});

$(window).on('load',
    function idFocus(){
    $('#id').on('input', async () => {
        if($('#id').val()){
            $('#name').prop('disabled', true);
        }
        else
            $('#name').prop('disabled', false);
        })
    }
);

$(window).on('load',
    function nameFocus(){
    $('#name').on('input', async () => {
        if($('#name').val()){
            $('#id').prop('disabled', true);
        }
        else
            $('#id').prop('disabled', false);
        })
    }
)
