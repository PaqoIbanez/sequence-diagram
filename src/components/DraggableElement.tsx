import { Droppable } from "react-beautiful-dnd";
import { Competence } from "../interfaces/interfaces";
import { AddForm } from "./AddForm";
import ListItem from "./ListItem";
import { useState, useContext } from 'react';
import { LinkedContext } from '../context/LinkedContext';

interface Props {
   columnId: string;
   column: {
      name: string;
      items: Competence[];
   };
}

export const DraggableElement = ({ columnId, column }: Props) => {

   const { state } = useContext(LinkedContext);

   if (state === 'edit') {


   }

   const [isHover, setIsHover] = useState(false);
   const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

   return <Droppable droppableId={columnId} >
      {(provided) => (
         <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={{ marginRight: '25px' }}
            onMouseEnter={() => (!isAddButtonClicked && !isHover) && setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
         >
            <div style={{ whiteSpace: 'pre-line', fontSize: 12, fontWeight: 'bold' , textAlign: 'center', marginBottom: 10}}>
               {column.name}
            </div>
            {

               column.items.map((item, index) => {
                  return <ListItem key={item.id} item={item} index={index} columnId={columnId} setIsAddButtonClicked={setIsAddButtonClicked} />
               })
            }
            {provided.placeholder}
            {
               isAddButtonClicked &&
               <AddForm setIsAddButtonClicked={setIsAddButtonClicked} columnId={columnId} />
            }
            {
               isHover &&
               <button className="btn-add" onClick={() => {
                  setIsHover(false)
                  setIsAddButtonClicked(true)
               }}>+</button>
            }
         </div>
      )}
   </Droppable>
}
