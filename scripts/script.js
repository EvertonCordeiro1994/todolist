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
        .attr('title', 'trocar para modo escuro')
        .on('click', () => {
            const $icon = $('#themeButton')
            if ($icon.hasClass('fa-moon')) {
                $icon.removeClass('fa-moon').addClass('fa-sun').css('color', 'yellow')
                $('body').addClass('bg-neutral-800 text-white').removeClass('bg-slate-100 text-black')
                $themeButton.attr('title', 'trocar para modo claro')
                saveTheme('dark')
            } else {
                $icon.removeClass('fa-sun').addClass('fa-moon').css('color', 'blue')
                $('body').addClass('bg-slate-100 text-black').removeClass('bg-neutral-800 text-white')
                $themeButton.attr('title', 'trocar para modo escuro')
                saveTheme('light')
            }
        })

    $app.append($header.append($title, $themeButton))

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

    $app.append($inputDiv.append($taskInput, $addButton))

    const $taskList = $('<ul></ul>')
        .attr('id', 'task-list')
        .addClass('w-full bg-transparent')

    $('body').append($app.append($taskList))

    const  addTask = (taskText, isCompleted = false) => {
        const $listItem = $('<li></li>')
            .addClass('flex justify-between items-center border border-gray-300 rounded p-2 mb-2 bg-transparent')

        const $taskDiv = $('<div></div>')
            .addClass('text-lg bg-transparent w-3/4 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer')
            .text(taskText)
            .on('click', () => $taskDiv.toggleClass('line-through'))

        isCompleted && $taskDiv.addClass('line-through')

        const $deleteButton = $('<button></button>')
            .html('<i class="fa-solid fa-trash-can" style="color: #ff1900; width: 1.5em; height: 1.5em;"></i>')
            .addClass('px-3 py-1 rounded')
            .on('click', () => {
                $listItem.remove()
                saveTasks() 
            })

        $('#task-list').append($listItem.append($taskDiv, $deleteButton))
    }

    function saveTasks() {
        const tasks = []
        $('#task-list li').each(function () {
            const text = $(this).find('div').text()
            const isCompleted = $(this).find('div').hasClass('line-through')
            tasks.push({ text, isCompleted })
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        tasks.forEach(task => addTask(task.text, task.isCompleted))
    }

    const  saveTheme = (theme) => localStorage.setItem('theme', theme)

    function loadTheme() {
        const theme = localStorage.getItem('theme') || 'dark'
        const $icon = $('#themeButton')
        if (theme === 'dark') {
            $icon.removeClass('fa-moon').addClass('fa-sun').css('color', 'yellow')
            $('body').addClass('bg-neutral-800 text-white').removeClass('bg-slate-100 text-black')
            $themeButton.attr('title', 'trocar para modo claro')
        } else {
            $icon.removeClass('fa-sun').addClass('fa-moon').css('color', 'blue')
            $('body').addClass('bg-slate-100 text-black').removeClass('bg-neutral-800 text-white')
            $themeButton.attr('title', 'trocar para modo escuro')
        }
    }

    $('#add-task').on('click', function () {
        const taskText = $('#task-input').val().trim()
        if (taskText) {
            addTask(taskText)
            $('#task-input').val('')
            saveTasks()
        }
    })

    $('#task-input').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault()
            const taskText = $(this).val().trim()
            if (taskText) {
                addTask(taskText)
                $(this).val('')
                saveTasks()
            }
        }
    })

    const $footer = $('<footer></footer>')
        .addClass('text-center')

    const $textFooter = $('<h1></h1>')
        .text('CODE BY ÉVERTON CORDEIRO')
        .addClass('text-center text-1xl text-blue-300 text-opacity-4')

    $('body').append($footer.append($textFooter))
    
    loadTasks()
    loadTheme()
})