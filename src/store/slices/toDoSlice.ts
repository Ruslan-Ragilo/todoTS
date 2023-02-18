import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IItemTodo {
    id: number;
    title: string,
    complited: boolean
}

interface IState {
    listTodo:  IItemTodo[],
    editItem: IItemTodo,
    vulueInput: string,
    isEdit: boolean
}

const initialState: IState = {
    listTodo: [],
    vulueInput: '',
    isEdit: false,
    editItem: {
        id: 1,
        title: '',
        complited: false
    }
}

export const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    onChangeInput(state,  action: PayloadAction<string>) {
        state.vulueInput = action.payload;
    },
    addToDo(state,  action: PayloadAction<IItemTodo>) {
        if (state.vulueInput) {
            state.listTodo = [...state.listTodo, action.payload]
            state.vulueInput = ''
            localStorage.setItem('listToDo', JSON.stringify(state.listTodo))
        }
    },
    removeToDo(state,  action: PayloadAction<number>) {
        state.listTodo = state.listTodo.filter(el => el.id !== action.payload)
        localStorage.setItem('listToDo', JSON.stringify(state.listTodo))
    },
    editToDo(state,  action: PayloadAction<IItemTodo>) {
        state.isEdit = false
        state.editItem = action.payload
        state.vulueInput = action.payload.title
        state.isEdit = true
    },
    addToDoEdit(state) {
            state.editItem.title = state.vulueInput
        if (state.vulueInput) {
            state.isEdit = false
            state.listTodo = state.listTodo.filter(el => {
                if(state.editItem?.id === el.id) {
                    el.title = state.vulueInput
                    return el
                } else {
                    return el
                }
            })
            localStorage.setItem('listToDo', JSON.stringify(state.listTodo))
            state.vulueInput = ''
        }
    },
    getToDoLocalStorage(state) {
        state.listTodo = localStorage.getItem('listToDo') ? JSON.parse(localStorage.getItem('listToDo') || '') : []
    },
    setComplited(state, action: PayloadAction<number>) {
        state.listTodo = state.listTodo.filter(el => {
            if(action.payload === el.id) {
                el.complited = !el.complited
                return el
            } else {
                return el
            }
        })
        localStorage.setItem('listToDo', JSON.stringify(state.listTodo))
    }
  },
})


export const {onChangeInput, addToDo, removeToDo, editToDo, addToDoEdit, getToDoLocalStorage, setComplited} = toDoSlice.actions

export default toDoSlice.reducer