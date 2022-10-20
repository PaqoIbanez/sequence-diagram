import Xarrow from "react-xarrows";
import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Competence, Line, Subcompetence, RelationAPI } from '../interfaces/interfaces';
import { onDragEnd, getColumns, handleRelations } from '../utils';
import { DraggableElement } from "./DraggableElement";
import { LinkedContext } from '../context/LinkedContext';
import { linkedListAPI } from '../api/api';
import { SubCompetencesBar } from "./SubCompetencesBar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ufData } from '../data/uf';
import { relationsData } from '../data/relations';

type Columns = {
   [key: string]: {
      name: string;
      items: Competence[]
   }
}

export const DragList = () => {
   const { setRelations, relations, showLines, selected, competences, setCompetences, setShowLines, setLines, setSubcompetences, subcompetences, setSelectedSubcompetence, selectedSubcompetence } = useContext(LinkedContext);
   const [columns, setColumns] = useState<Columns>(getColumns(competences));


   useEffect(() => {
      // linkedListAPI.get('/ufs/1').then(data => {
         setCompetences(ufData.data[0].competences)
      // });
      // linkedListAPI.get<RelationAPI>('/relations').then(data => {
         const relations = relationsData.data;
         const tmpSubcompetences: string[] = [];
         relations.map((a: any) => tmpSubcompetences.push(a.name));
         const subcompetences = new Set(tmpSubcompetences);
         setShowLines([...subcompetences]);
         setSubcompetences([...subcompetences]);
         setRelations(relations);
      // });
   }, []);

   useEffect(() => {
      const newLines = handleRelations(relations.map((relation: any) => {
         return {
            subcompetence: relation.name,
            start: relation.from,
            end: relation.to
         }
      }));
      setLines(newLines);
   }, [relations])

   useEffect(() => {
      setColumns(getColumns(competences));
   }, [competences]);

   const printDocument = () => {
      const input = document.getElementById('pdf');
      html2canvas(input!, {
         // useCORS: true,
         // allowTaint: true,
         // scrollY: -window.scrollY,
         scale: 2,
         width: 1200
      }).then(canvas => {
         const image = canvas.toDataURL('image/jpeg', 100);
         const doc = new jsPDF('landscape', undefined, 'a4');
         const pageWidth = doc.internal.pageSize.getWidth();
         const pageHeight = doc.internal.pageSize.getHeight();

         const widthRatio = pageWidth / canvas.width;
         const heightRatio = pageHeight / canvas.height;
         const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

         const canvasWidth = canvas.width * ratio;
         const canvasHeight = canvas.height * ratio;

         const marginX = (pageWidth - canvasWidth) / 2;
         const marginY = (pageHeight - canvasHeight) / 2;

         doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
         doc.output('dataurlnewwindow');
      });
   }

   return <div>
      <div style={{display: 'flex'}}>

      <SubCompetencesBar />
      <button onClick={printDocument} style={{height: 20}}> View PDF </button>
      </div>
      <div id="pdf">
         <div
            style={{
               width: 1175,
               alignItems: 'center',
               padding: '10px',
               textAlign: 'center'
            }}
         >
            {
               selected === null &&
               <div style={{ height: 31, fontWeight: 'bold' }}> Computer Science and Technology Engineering 2019 </div>
            }
         </div>
         <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            <div
               style={{
                  display: 'flex',
                  width: 1175,
                  justifyContent: 'space-between',
                  paddingInline: '10px'
               }}
            >
               {
                  Object.entries(columns).map(([columnId, column], index) => {
                     return <DraggableElement
                        columnId={columnId}
                        column={column}
                        key={columnId}
                     />
                  })
               }
            </div>
            <div className="float">
               {
                  subcompetences.map((sub, i) => {
                     return <div key={sub} style={{ display: 'flex' }}>
                        <input
                           type='checkbox'
                           checked={showLines.includes(sub)}
                           onChange={() => {
                              showLines.includes(sub) ? setShowLines(showLines.filter(line => line !== sub)) : setShowLines([...showLines, sub])
                           }}
                        />
                        <div
                           style={{
                              textAlign: 'center',
                              margin: '7px',
                              display: 'flex'
                           }}
                        >
                           <div
                              style={{
                                 padding: '0 10px',
                                 borderTop: `1px solid ${i === 0
                                    ? 'red'
                                    : i === 1
                                       ? 'black'
                                       : i === 2
                                          ? 'blue'
                                          : i === 3
                                             ? 'green'
                                             : i === 4
                                                ? 'purple'
                                                : i === 5
                                                   ? 'brown'
                                                   : i === 6
                                                      ? 'darkcyan'
                                                      : i === 7
                                                         ? 'orange'
                                                         : i === 8
                                                            ? 'burlywood'
                                                            : i === 9
                                                               ? 'firebrick'
                                                               : 'dimgray'
                                    }`,
                                 height: '2px',
                                 width: 60
                              }}
                           />
                        </div>
                        <div
                           onClick={() => {
                              selectedSubcompetence === sub
                                 ? setSelectedSubcompetence('')
                                 : setSelectedSubcompetence(sub)
                           }}
                           style={{
                              cursor: 'pointer',
                              color: selectedSubcompetence === sub ? 'blue' : 'black',
                           }}
                           className={`subcompetence ${selectedSubcompetence === sub && 'selected'}`}
                        >
                           {sub}
                        </div>
                        <button
                           className="delete-button"
                           onClick={() => {
                              setSubcompetences([...subcompetences.filter(subcompetence => subcompetence !== sub)]);
                              setRelations([...relations.filter(relation => relation.name !== sub)]);
                           }}
                        >X</button>
                     </div>
                  })
               }
            </div>
         </DragDropContext>
      </div>
   </div>
}

export default DragList;
