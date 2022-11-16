export namespace Task {
  export interface Model {
    _id: string;
    title: string;
    description: string;
    done: Boolean;
    date: string; //date;
    list: string;
  }

  export interface State {
    completedTask: Task.Model[];
    tasks: Task.Model[];
  }
}
