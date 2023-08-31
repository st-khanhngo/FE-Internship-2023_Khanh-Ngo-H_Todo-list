export interface TodoProps {
  id: number;
  name: string;
  isCompleted: boolean;
}

export enum Tab {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface ActionProps {
  type: string;
  payload?: any;
}
