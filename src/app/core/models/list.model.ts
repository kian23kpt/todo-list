export namespace List {
  export interface Model {
    _id: string;
    title: string;
    isMain: boolean;
    date: string; //date
  }

  export interface State {
    lists: Model[];
    selectedList: Model | null;
  }
}
