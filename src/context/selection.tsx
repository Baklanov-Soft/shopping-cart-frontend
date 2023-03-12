import { CartItem } from 'types/cart';
import React, { createContext, useContext, useReducer } from 'react';

type UUID = string;

const initialState: UUID[] = [];

interface SelectionContextType {
  state: UUID[];
  dispatch: React.Dispatch<Action>;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

enum ActionType {
  Toggle = 'Toggle',
  ToggleAll = 'ToggleAll'
}

interface ToggleAction {
  type: ActionType.Toggle;
  payload: { uuid: UUID };
}

interface ToggleAllAction {
  type: ActionType.ToggleAll;
  payload: { data: CartItem[] };
}

type Action = ToggleAction | ToggleAllAction;

function selectionReducer(state: UUID[], action: Action) {
  switch (action.type) {
    case ActionType.Toggle:
      return state.includes(action.payload.uuid)
        ? state.filter((uuid) => uuid !== action.payload.uuid)
        : [...state, action.payload.uuid];

    case ActionType.ToggleAll:
      return state.length === action.payload.data.length
        ? []
        : action.payload.data.map((item) => item.item.uuid);
  }
}

function SelectionProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(selectionReducer, initialState);
  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
}

function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}

function toggle(uuid: UUID): Action {
  return { type: ActionType.Toggle, payload: { uuid } };
}

function toggleAll(data: CartItem[]): Action {
  return { type: ActionType.ToggleAll, payload: { data } };
}

export { SelectionProvider, useSelection, toggle, toggleAll };
