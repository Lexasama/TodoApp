import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Task} from './models/task/Task';
import TaskService from './services/task.service';
import Fontawesome from 'lit-fontawesome';

const TaskFilters = {
  ALL: 'all',
  ACTIVE: 'incomplete',
  COMPLETED: 'complete',
};

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = [
    css`
      button {
        background: none;
        border: none;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
      }
      button:focus {
        outline: none;
      }
      button:hover {
        cursor: pointer;
      }
      .app {
        min-height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 1em;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 0 5px rgba(25, 25, 25, 0.25);
      }

      .btn {
        font-size: 14px;
        margin: 0 0.5em;
        border-radius: 2em;
        padding: 0.75em 1.5em;
        cursor: pointer;
        background: none;
        color: #2d7c58;
        border: 1px solid;
        letter-spacing: 1px;
        font-family: 'Source Sans Pro', sans-serif;
        color: #4fc08d;
        border: #4fc08d 1px solid;
        transition: 250ms ease-out;
      }
      .btn:hover,
      .btn:focus {
        color: #fff;
        background: #4fc08d;
      }

      .form {
        width: 100%;
        padding: 1.5rem 1rem 0 1rem;
        display: flex;
      }
      .form__input {
        width: 100%;
        font-size: 14px;
        margin: 0 0.5em;
        border-radius: 2em;
        padding: 0.75em 1.5em;
        background: none;
        font-family: 'Source Sans Pro', sans-serif;
        border: #e3e3e3 1px solid;
        transition: border 250ms ease-out;
      }
      .form__input:focus {
        border: #4fc08d 1px solid;
        outline: none;
      }
      .todo-list {
        width: 100%;
        padding: 0 1rem;
        flex: 1;
      }
      .todo-list__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em;
        margin-bottom: 0.5em;
        border-radius: 3px;
        transition: 200ms;
        color: #4fc08d;
      }
      .todo-list__item:last-child {
        margin-bottom: 0;
      }
      .todo-list__item.complete {
        color: lightgreen;
      }
      .todo-list__item.complete .todo-list__item-content:after {
        background: lightgreen;
      }
      .todo-list__item-content {
        position: relative;
      }
      .todo-list__item-content:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        height: 1px;
        background: #4fc08d;
        transition: 250ms ease-out;
        transform-origin: center;
        transform: scalex(0);
      }
      .todo-list__item-content:hover:after,
      .todo-list__item-content:focus:after {
        transform: scalex(1);
      }
      .todo-list__item-remove {
        margin-left: 0.5em;
        background: none;
        border: 1px solid;
        color: inherit;
        padding: 0;
        line-height: 1;
        width: 2em;
        height: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 80%;
      }

      .filters {
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 0 1rem 1.5rem 1rem;
      }
    `,
    Fontawesome,
  ];

  @property()
  title: string = '';

  @property()
  filter: string = TaskFilters.ALL;

  @property({type: Array})
  todos: Array<Task>;

  constructor() {
    super();
    this.todos = [];
    this.refreshList();
  }
  render() {
    return html`
      <div class="app" id="app">
        <h1>TODO List</h1>
        <form class="form">
          <input
            class="input form__input"
            type="text"
            name="title"
            .value="${this.title}"
            @change="${this.updateTitle}"
          />
          <button
            type="submit"
            class="btn form__submit-btn"
            @click="${this.onSubmit}"
          >
            Add
          </button>
        </form>
        <div class="todo-list">
          ${this.applyFilter(this.todos).map(
            (todo) => html`
              <li
                class=${todo.isDone
                  ? 'todo-list__item complete'
                  : 'todo-list__item'}
              >
                <button
                  class="todo-list__item-content"
                  style=${todo.isDone ? 'text-decoration: line-through;' : ''}
                  @click=${() => this.toggleTodo(todo)}
                >
                  ${todo.title}
                </button>

                <button
                  class="btn todo-list__item-remove"
                  @click=${() => this.deleteTodo(todo.taskId)}
                >
                  <i class=${todo.isDone ? 'fas fa-check' : 'fas fa-times'}></i>
                </button>
              </li>
            `
          )}
        </div>
        <div class="filters">
          <button
            class="btn filters__btn filters__btn--all"
            @click="${() => this.updateFilter(TaskFilters.ALL)}"
          >
            All
          </button>
          <button
            class="btn filters__btn filters__btn--complete"
            @click=${() => this.updateFilter(TaskFilters.COMPLETED)}
          >
            Complete
          </button>
          <button
            class="btn filters__btn filters__btn--incomplete"
            @click=${() => this.updateFilter(TaskFilters.ACTIVE)}
          >
            Incomplete
          </button>
        </div>
      </div>
    `;
  }

  applyFilter(todos: Array<Task>) {
    switch (this.filter) {
      case TaskFilters.ACTIVE:
        return todos.filter((todo) => !todo.isDone);
      case TaskFilters.COMPLETED:
        return todos.filter((todo) => todo.isDone);
      default:
        return this.todos;
    }
  }

  async deleteTodo(id: number) {
    await TaskService.delete(id);
    await this.refreshList();
  }

  async onSubmit(e: Event) {
    //to prevent the page from reloading after the form is submitted
    e.preventDefault();
    if (this.title.length < 3) return;

    await TaskService.create(this.title);
    this.title = '';
    await this.refreshList();
  }

  async refreshList() {
    this.todos = await TaskService.list();
    this.requestUpdate();
  }

  async toggleTodo(todo: Task) {
    todo.isDone = !todo.isDone;
    await TaskService.update(todo.taskId, todo);
    await this.refreshList();
  }

  updateFilter(filter: string) {
    this.filter = filter;
  }

  updateTitle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.title = input.value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
