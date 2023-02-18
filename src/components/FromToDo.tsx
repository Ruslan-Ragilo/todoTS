import { FormEvent, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, addToDoEdit, onChangeInput } from '../store/slices/toDoSlice';
import { RootState } from '../store/store';

function FormToDo() {
    const {vulueInput, isEdit} = useSelector((state: RootState) => state.toDoReducer);
    const dispatch = useDispatch();

    const inputReference = useRef<HTMLInputElement | null>(null);
    isEdit && inputReference?.current?.focus();

    const addTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEdit) {
            dispatch(addToDo({
                id: Date.now(),
                title: vulueInput,
                complited: false
            }))
        } else {
            dispatch(addToDoEdit())
        }
    }

    return (  
        <Form onSubmit={(e) => addTask(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ToDo title</Form.Label>
                <Form.Control ref={inputReference} onChange={(e) => dispatch(onChangeInput(e.target.value))} value={vulueInput} type="text" placeholder="Enter ToDo" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default FormToDo;