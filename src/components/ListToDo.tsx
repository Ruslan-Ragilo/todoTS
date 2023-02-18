import { useDispatch, useSelector } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';
import { BsTrash, BsFillPencilFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { RootState } from '../store/store';
import { editToDo, getToDoLocalStorage, removeToDo, setComplited } from '../store/slices/toDoSlice';
import { useEffect } from 'react';

function ListToDo() {
    const listToDo = useSelector((state: RootState) => state.toDoReducer.listTodo);
    const dispatch = useDispatch();
    console.log(listToDo)

    useEffect(() => {
        dispatch(getToDoLocalStorage())
    },[])

    return ( 
        <ListGroup className='mt-5'>
            {listToDo.map(el => (
                <ListGroup.Item key={el.id} className='d-flex align-items-center justify-content-between'>
                    <p className={el.complited ? 'text-decoration-line-through' : ''}>{el.title}</p>
                    <div className="wrapperBtn d-flex align-items-center justify-content-between">
                        <BsFillBookmarkCheckFill className='icon' color='green' onClick={() => dispatch(setComplited(el.id))} />
                        <BsFillPencilFill className='icon' color='gray' onClick={() => dispatch(editToDo(el))} />
                        <BsTrash className='icon' color='red' onClick={() => dispatch(removeToDo(el.id))} />
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
     );
}

export default ListToDo;