import { List } from '../models';

export namespace ListActions {
  export class MainList {
    static readonly type = '[List] Main List';
  }

  export class AllLists {
    static readonly type = '[List] All Lists';
  }

  export class GetSingleList {
    static readonly type = '[List] One List';

    constructor(public id: string) {}
  }
  export class AddList {
    static readonly type = '[List] Add List';
    constructor(public title: string) {}
  }

  export class EditList {
    static readonly type = '[List] Edit List';

    constructor(public id: string, public title: string) {}
  }
  export class DeleteList {
    static readonly type = '[List] Delete List';

    constructor(public id: string) {}
  }
}
