import { useContext } from "react";
import { LinkedContext } from "../context";
import { State, Competence } from '../interfaces/interfaces';
// import { uf } from '../data/data';

export const TopBar = () => {

   const { setState, setSelected, selected, deleteSubcompetence, relations, setRelations } = useContext(LinkedContext);

   const handleClick = (state: State) => {
      if (state === 'normal') {
         setSelected(null);
      }
      if (state === 'delete') {
         const newLines = relations.filter(relation => relation.from.id !== selected!.id && relation.to.id !== selected!.id);
         setRelations(newLines);
         deleteSubcompetence(selected?.id!);
         setSelected(null);
         return;
      }
      setState(state);
   }

   return (
      <div
         style={{
            width: 1175,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px'
         }}
      >
         {
            selected !== null
            && <>
               <button onClick={() => handleClick('edit')} className="topBarButton edit">Edit</button>
               <button onClick={() => handleClick('delete')} className="topBarButton delete">Delete</button>
               <button onClick={() => handleClick('addConnection')} className="topBarButton">Add connection</button>
               <button onClick={() => handleClick('removeConnection')} className="topBarButton">Delete Connection</button>
               <button onClick={() => handleClick('normal')} className="topBarButton">Cancel</button>
            </>
         }
      </div>
   )
}