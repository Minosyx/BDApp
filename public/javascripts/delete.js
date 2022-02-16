// function del() {
//     const form = document.getElementById('form');
//     form.addEventListener('submit', async event => {
//         event.preventDefault();
//         const idInput = form.querySelector('input[name="id"]');
//         const id = idInput.value;

//         var path = location.pathname;
//         path = path.substring(0, path.lastIndexOf("/") + 1);

//         const res = await fetch(path + `/${id}`, {
//         method: 'DELETE',
//         });
//         const json = await res.json();

//         console.log(json);
//     });
// }

function del(){
    $('#submit').on('click', async (event) => {
        event.preventDefault();
        const id = $('#id').val();

        var path = location.pathname;
        path = path.substring(0, path.lastIndexOf("/") + 1);

        $.ajax({
            type: 'DELETE',
            url: path + `${id}`
        }).done(() => {
            console.log("SUCCESS");
            $('#id').val('');
        }).fail(() => {
            console.log("FAILURE");
        })
    })
}