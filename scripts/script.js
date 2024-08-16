$(document).ready(function () {

    const $app = $('<div></div>')
        .addClass('flex flex-col items-center w-full max-w-md mx-auto')

    const $header = $('<div></div>')
        .addClass('flex items-center gap-x-4')


    const $title = $('<h1></h1>')
        .text('Lista de Tarefas')
        .addClass('text-4xl font-bold mb-4')

    const $themeButton = $('<button></button>')
        .addClass('p-2 text-blue-500')
        .html('<i id="themeButton" class="fa-solid fa-moon w-6 h-6"></i>')

        .addClass('p-2')
        .on('click', function () {
            const $icon = $('#themeButton')

            if ($icon.hasClass('fa-moon')) {
                $icon.removeClass('fa-moon').addClass('fa-sun').css('color', 'yellow')
                $('body').addClass('bg-neutral-800 text-white').removeClass('bg-slate-100 text-black')
            } else {
                $icon.removeClass('fa-sun').addClass('fa-moon').css('color', 'blue')
                $('body').addClass('bg-slate-100 text-black').removeClass('bg-neutral-800 text-white')
            }
        })


    $header.append($title, $themeButton)

    $app.append($header)

    const $inputDiv = $('<div></div>')
        .addClass('flex gap-2 mb-4')

    const $taskInput = $('<input>')
        .attr('id', 'task-input')
        .attr('type', 'text')
        .attr('placeholder', 'Digite sua tarefa')
        .addClass('border border-gray-300 rounded px-4 py-2 bg-transparent')

    const $addButton = $('<button></button>')
        .attr('id', 'add-task')
        .text('Adicionar Tarefa')
        .addClass('bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600')

    $inputDiv.append($taskInput, $addButton)
    $app.append($inputDiv)

    const $taskList = $('<ul></ul>')
        .attr('id', 'task-list')
        .addClass('w-full bg-transparent')



    $app.append($taskList)

    $('body').append($app)

    $('#add-task').on('click', () => {
        const taskText = $('#task-input').val().trim()

        if (taskText) {
            const $listItem = $('<li></li>')
                .addClass('flex justify-between items-center border border-gray-300 rounded p-2 mb-2 bg-transparent')

            const $taskDiv = $('<div></div>')
                .addClass('text-lg bg-transparent')
                .text(taskText)
                .on('click', function () {
                    $(this).toggleClass('line-through')
                })
                .css('cursor', 'pointer')

            const $deleteButton = $('<button></button>')
                .html('<i class="fa-solid fa-trash-can" style="color: #ff1900; width: 1.5em; height: 1.5em;"></i>')
                .addClass('px-3 py-1 rounded')
                .on('click', function () {
                    $listItem.remove()
                })

            $listItem.append($taskDiv, $deleteButton)
            $('#task-list').append($listItem)
            $('#task-input').val('')
        }
    })
})
