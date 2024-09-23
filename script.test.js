/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Adicionar o TextEncoder se necessário
global.TextEncoder = require('util').TextEncoder;

describe('Lista de Tarefas', () => {
    let document;

    beforeEach(() => {
        const dom = new JSDOM(fs.readFileSync(path.resolve(__dirname, 'index.html')));
        document = dom.window.document;
        global.document = document;
        global.window = dom.window;

        require('./script.js');
    });

    test('deve adicionar uma tarefa', () => {
        const input = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');
        
        input.value = 'Tarefa 1';
        addButton.click();
        
        const taskList = document.getElementById('taskList');
        expect(taskList.children.length).toBe(1);
        expect(taskList.children[0].textContent).toContain('Tarefa 1');
    });

    test('deve remover uma tarefa', () => {
        const input = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');

        input.value = 'Tarefa a remover';
        addButton.click();

        const removeButton = document.querySelector('button');
        removeButton.click();
        
        const taskList = document.getElementById('taskList');
        expect(taskList.children.length).toBe(0);
    });

    test('deve adicionar e remover múltiplas tarefas', () => {
        const input = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');

        for (let i = 1; i <= 3; i++) {
            input.value = `Tarefa ${i}`;
            addButton.click();
        }

        const taskList = document.getElementById('taskList');
        expect(taskList.children.length).toBe(3);

        const removeButtons = document.querySelectorAll('button');
        removeButtons.forEach(button => button.click());

        expect(taskList.children.length).toBe(0);
    });
});
