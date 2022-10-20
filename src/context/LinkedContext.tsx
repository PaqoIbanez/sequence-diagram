import { createContext } from 'react'
import { Line, State, Competence, Relation } from '../interfaces/interfaces';

interface ContextProps {
   competences: Competence[];
   subcompetences: string[];
   selectedSubcompetence: string;
   selected: Competence | null;
   // columnId: string | null;
   state: State;
   lines: Line[];
   relations: Relation[];
   showLines: string[];

   //Methods
   setSelected: (competence: Competence | null) => void;
   setState: (state: State) => void;
   addConnection: (from: Competence, to: Competence) => void;
   removeConnection: (from: string, to: string) => void;
   setCompetences: (competences: Competence[]) => void;
   addCompetence: (competence: Competence) => void;
   deleteSubcompetence: (id: string) => void;
   setLines: (lines: Line[]) => void;
   setSubcompetences: (subcompetences: string[]) => void;
   setSelectedSubcompetence: (subcompetence: string) => void;
   setRelations: (relations: Relation[]) => void;
   setShowLines: (lines: string[]) => void;
};

export const LinkedContext = createContext({} as ContextProps);