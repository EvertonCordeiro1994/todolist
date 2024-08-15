$(document).ready(function () {

    const $body = $('body')

    const $app = $('<div></div>')
        .addClass('flex flex-col items-center w-full max-w-md mx-auto')

    const $header = $('<h1></h1>')
        .text('Lista de Tarefas')
        .addClass('text-4xl font-bold mb-4')

    $app.append($header)


    const $inputDiv = $('<div></div>').addClass('flex gap-2 mb-4')

    const $taskInput = $('<input>').attr('id', 'task-input')
        .attr('type', 'text')
        .attr('placeholder', 'Digite sua tarefa')
        .addClass('border border-gray-300 rounded px-4 py-2')

    const $addButton = $('<button></button>').attr('id', 'add-task')
        .text('Adicionar Tarefa')
        .addClass('bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600')


    $inputDiv.append($taskInput, $addButton)
    $app.append($inputDiv)


    const $taskList = $('<ul></ul>')
        .attr('id', 'task-list')
        .addClass('w-full')


    $app.append($taskList)

    $body.append($app)


    $('#add-task').on('click', () => {
        const taskText = $('#task-input').val().trim()

        if (taskText) {

            const $listItem = $('<li></li>')
                .addClass('flex justify-between items-center bg-white border border-gray-300 rounded p-2 mb-2')


            const $taskDiv = $('<div></div>')
                .addClass('text-lg').text(taskText)

            $listItem.append($taskDiv)


            const $deleteButton = $('<button></button>')
                .text('Excluir')
                .addClass('bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600')
                .on('click', () => $listItem.remove())

            $listItem.append($deleteButton)

            $('#task-list').append($listItem)

            $('#task-input').val('')
        }
    })
})
