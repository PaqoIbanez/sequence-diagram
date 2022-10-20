import { Draggable } from "react-beautiful-dnd";
import { Competence, Subcompetence } from '../interfaces/interfaces';
import Xarrow from 'react-xarrows';
import { Dispatch, SetStateAction, useContext } from "react";
import { LinkedContext } from "../context";
import { AddForm } from "./AddForm";

interface Props {
   item: Competence;
   index: number;
   columnId: string;
   setIsAddButtonClicked: Dispatch<SetStateAction<boolean>>;
}

const ListItem = ({ item, index, columnId, setIsAddButtonClicked }: Props) => {

   const { showLines, selected, setSelected, setRelations, relations, state, setState, addConnection, removeConnection, lines, subcompetences, selectedSubcompetence } = useContext(LinkedContext);

   const handleClick = (item: Competence) => {
      // if (state === 'delete') {
      //    setState('normal');
      //    return setSelected(null);
      // }

      setSelected(item);
      if (state === 'addConnection') {
         if (selectedSubcompetence === '') {
            setSelected(selected);
            return alert('You must select a subcompetence first');
         };
         setRelations([...relations, {
            from: selected!,
            name: selectedSubcompetence,
            to: item,
         }]);

      } else if (state === 'removeConnection') {
         // removeConnection(selected?.id!, item.id);
         console.log(relations);
         const lineRemoved = relations.filter(relation => relation.from.id !== selected!.id || relation.to.id !== item.id || relation.name !== selectedSubcompetence);
         console.log(lineRemoved);
         setRelations(lineRemoved);
      }
      setState('normal');
      if (selected !== null) {
         setSelected(null);
      }
   }

   return (
      <Draggable draggableId={item.id} index={index}>
         {(provided, snapshot) => {

            if (selected?.id === item.id && state === 'edit') {
               return <AddForm competence={item} columnId={columnId} setIsAddButtonClicked={setIsAddButtonClicked} />
            } else {

               return <div
                  id={item.id}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                     userSelect: "none",
                     marginBottom: 20,
                     textAlign: 'center',
                     border: '2px solid black',
                     padding: 5,
                     width: 90,
                     // fontWeight: 600,
                     fontSize: 10,
                     backgroundColor: snapshot.isDragging
                        ? "gray"
                        : selected?.id === item.id ? "rgb(135, 207, 255)" : selected?.id !== item.id && selected !== null && state !== 'normal' ? "rgb(235,235,235)" : "white",
                     ...provided.draggableProps.style
                  }}
                  onClick={() => handleClick(item)}
               >
                  {`${item.id} ${item.name}`}

                  {
                     lines.map((line, i) => {


                        if (line.start === item.id && showLines.includes(line.subcompetence)) {

                           return (
                              <Xarrow
                                 headSize={8}
                                 // zIndex={-1}
                                 strokeWidth={line.subcompetence === selectedSubcompetence ? 1.2 : 0.8}
                                 key={i}
                                 {...line}
                                 startAnchor={{
                                    position: "right",
                                    offset: i === 0
                                       ? { y: -17 }
                                       : i == 1
                                          ? { y: -13 }
                                          : i == 2
                                             ? { y: -9 }
                                             : i == 3
                                                ? { y: -5 }
                                                : i == 4
                                                   ? { y: 3 }
                                                   : i == 5
                                                      ? { y: 5 }
                                                      : i == 6
                                                         ? { y: 9 }
                                                         : i == 7
                                                            ? { y: 13 }
                                                            : i == 8
                                                               ? { y: 17 }
                                                               : i == 9
                                                                  ? { y: 21 }
                                                                  : i == 10
                                                                     ? { y: 24 }
                                                                     : { y: 10 }
                                 }}
                                 endAnchor={{
                                    position: "left", offset: i === 0
                                       ? { y: -17 }
                                       : i == 1
                                          ? { y: -13 }
                                          : i == 2
                                             ? { y: -9 }
                                             : i == 3
                                                ? { y: -5 }
                                                : i == 4
                                                   ? { y: 3 }
                                                   : i == 5
                                                      ? { y: 5 }
                                                      : i == 6
                                                         ? { y: 9 }
                                                         : i == 7
                                                            ? { y: 13 }
                                                            : i == 8
                                                               ? { y: 17 }
                                                               : i == 9
                                                                  ? { y: 21 }
                                                                  : i == 10
                                                                     ? { y: 24 }
                                                                     : { y: 10 }
                                 }}
                                 labels={{
                                    start: <div
                                       style={{ fontSize: 8 }}
                                    >
                                       {line.labels.start}
                                    </div>,
                                    end: <div style={{ fontSize: 8 }}
                                    >
                                       {line.labels.end}
                                    </div>,
                                 }}
                                 color={
                                    line.subcompetence === subcompetences[0]
                                       ? 'red'
                                       : line.subcompetence === subcompetences[1]
                                          ? 'black'
                                          : line.subcompetence === subcompetences[2]
                                             ? 'blue'
                                             : line.subcompetence === subcompetences[3]
                                                ? 'green'
                                                : line.subcompetence === subcompetences[4]
                                                   ? 'purple'
                                                   : line.subcompetence === subcompetences[5]
                                                      ? 'brown'
                                                      : line.subcompetence === subcompetences[6]
                                                         ? 'darkcyan'
                                                         : line.subcompetence === subcompetences[7]
                                                            ? 'orange'
                                                            : line.subcompetence === subcompetences[8]
                                                               ? 'burlywood'
                                                               : line.subcompetence === subcompetences[9]
                                                                  ? 'firebrick'
                                                                  : 'dimgray'
                                 }
                                 path='smooth'
                                 curveness={0.2}
                              />
                           );
                        }
                     })
                  }

               </div>
            }


         }}
      </Draggable>
   );
};

export default ListItem;



