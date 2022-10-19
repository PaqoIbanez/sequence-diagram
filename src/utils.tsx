import { DropResult } from "react-beautiful-dnd";
// import { uf } from "./data/data";
import { useXarrow } from "react-xarrows";
import { Competence, Line, Subcompetence } from './interfaces/interfaces';

// const group = Array.prototype.groupBy();

export const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {

   if (!result.destination) return;
   const { source, destination } = result;

   if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
         ...columns,
         [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
         },
         [destination.droppableId]: {
            ...destColumn,
            items: destItems
         }
      });
   } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
         ...columns,
         [source.droppableId]: {
            ...column,
            items: copiedItems
         }
      });
   }
};

type Column = {
   [key: string]: {
      name: string;
      items: any[]
   }
}

export const getColumns = (competences: Competence[]) => {

   let columns: Column = {
      0: {
         name: 'Remedial \n Semester',
         items: competences.filter(competence => competence.semester === 0)
      },
      1: {
         name: 'First \n Semester',
         items: competences.filter(competence => competence.semester === 1)
      },
      2: {
         name: 'Second \n Semester',
         items: competences.filter(competence => competence.semester === 2)
      },
      3: {
         name: 'Third \n Semester',
         items: competences.filter(competence => competence.semester === 3)
      },
      4: {
         name: 'Fourth \n Semester',
         items: competences.filter(competence => competence.semester === 4)
      },
      5: {
         name: 'Fifth \n Semester',
         items: competences.filter(competence => competence.semester === 5)
      },
      6: {
         name: 'Sixth \n Semester',
         items: competences.filter(competence => competence.semester === 6)
      },
      7: {
         name: 'Seventh \n Semester',
         items: competences.filter(competence => competence.semester === 7)
      },
      8: {
         name: 'Eigth \n Semester',
         items: competences.filter(competence => competence.semester === 8)
      },
   };
   return columns;
}

export const handleRelations = (relations: { subcompetence: string, start: Competence, end: Competence }[]) => {
// console.log(relations);

   const groupByName = relations.reduce((group: any, product) => {
      const { subcompetence } = product;
      group[subcompetence] = group[subcompetence] ?? [];
      group[subcompetence].push(product);
      return group;
   }, {});

   const sorted = Object.entries(groupByName).map((subcompetence: any) => {
      return subcompetence[1].sort((a: any, b: any) => {
         if (a.start.semester < b.start.semester) {
            return -1;
         }
         if (a.start.semester > b.start.semester) {
            return 1;
         }
         return 0;
      });
   });

   const lines: Line[] = [];

   sorted.map((relation, r) => {
      relation.map((competence: any, i: number) => {
         lines.push({
            subcompetence: competence.subcompetence,
            start: competence.start.id,
            end: competence.end.id,
            labels: i === 0
               ? { start: "A", end: 'B' }
               : i === 1
                  ? { start: "B", end: 'C' }
                  : i === 2
                     ? { start: "C", end: 'D' }
                     : i === 3
                        ? { start: "D", end: 'E' }
                        : { start: "E", end: 'F' },
         });
      })
   });

   console.log(lines);
   

   return lines;
}