import { Task } from '../models';

export namespace TaskActions {
  

  export class AddTask {
    static readonly type = '[Task] Add Task';

    constructor(public data: Task.Model | any) {}
  }

  export class EditTask {
    static readonly type = '[Task] Edit Task';

    constructor(public id: string, public data: Task.Model | any) {}
  }

  export class DeleteTask {
    static readonly type = '[Task] delete Task';

    constructor(public id: string) {}
  }

  export class FindTaskByListId {
    static readonly type = '[Task] Find Task By List ID';

    constructor(public listId: string) {}
  }

  export class CompletedTasks {
    static readonly type = '[Task] Completed Tasks';
  }
}
