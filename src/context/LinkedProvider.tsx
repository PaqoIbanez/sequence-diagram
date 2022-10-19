import { useReducer } from 'react';
import { Competence, State, Line, Relation } from '../interfaces/interfaces';
import { LinkedContext, linkedReducer } from './';

export interface LinkedState {
   competences: Competence[];
   subcompetences: string[];
   selectedSubcompetence: string;
   selected: Competence | null;
   state: State;
   lines: Line[];
   relations: Relation[];
}

const LINKED_INITIAL_STATE: LinkedState = {
   competences: [],
   subcompetences: [],
   selectedSubcompetence: '',
   selected: null,
   relations: [],
   state: 'normal',
   lines: [],
}

interface Props {
   children: JSX.Element;
}

export const LinkedProvider = ({ children }: Props) => {

   const [state, dispatch] = useReducer(linkedReducer, LINKED_INITIAL_STATE);

   const setSelected = (competence: Competence | null) => {
      dispatch({ type: '[Linked] - competenceSelected', payload: competence });
   }

   const setState = (state: State) => {
      dispatch({ type: '[Linked] - setState', payload: state })
   }

   const addConnection = (start: Competence, end: Competence, semester: number) => {

      setRelations([...state.relations, {
         from: start,
         name: state.selectedSubcompetence,
         to: end,
      }]);


   }

   const removeConnection = (start: string, end: string) => {
      const newLines = state.lines.filter(line => line.start !== start || line.end !== end || line.subcompetence !== state.selectedSubcompetence);
      dispatch({ type: '[Linked] - removeConnection', payload: newLines });
   }

   const setCompetences = (competences: Competence[]) => {
      dispatch({ type: '[Linked] - setCompetences', payload: competences })
   }

   const addCompetence = (competence: Competence) => {
      const newCompetences = [...state.competences, competence];
      dispatch({ type: '[Linked] - setCompetences', payload: newCompetences })
   }

   const deleteSubcompetence = (id: string) => {
      const newCompetences = state.competences.filter(competence => competence.id !== id);
      console.log(state.competences);
      console.log(newCompetences);

      dispatch({ type: '[Linked] - deleteCompetence', payload: newCompetences })
   }

   const setLines = (lines: Line[]) => {
      dispatch({ type: '[Linked] - setLines', payload: lines })
   }

   const setRelations = (relations: Relation[]) => {
      dispatch({ type: '[Linked] - setRelations', payload: relations })
   }

   const setSubcompetences = (subcompetences: string[]) => {
      dispatch({ type: '[Linked] - setSubcompetences', payload: subcompetences })
   }

   const setSelectedSubcompetence = (subcompetence: string) => {
      dispatch({ type: '[Linked] - setSelectedSubcompetence', payload: subcompetence })
   }

   return (
      <LinkedContext.Provider value={{
         ...state,
         setSelected,
         setState,
         addConnection,
         removeConnection,
         setCompetences,
         deleteSubcompetence,
         addCompetence,
         setLines,
         setSubcompetences,
         setSelectedSubcompetence,
         setRelations
      }}>
         {children}
      </LinkedContext.Provider>
   )
}