import { LinkedState } from './';
import { State, Competence, Line, Relation } from '../interfaces/interfaces';

type LinkedActionType =
   | { type: '[Linked] - addConnection', payload: Line[] }
   | { type: '[Linked] - removeConnection', payload: Line[] }
   | { type: '[Linked] - competenceSelected', payload: Competence | null }
   | { type: '[Linked] - setState', payload: State }
   | { type: '[Linked] - setCompetences', payload: Competence[] }
   | { type: '[Linked] - deleteCompetence', payload: Competence[] }
   | { type: '[Linked] - setLines', payload: Line[] }
   | { type: '[Linked] - setSubcompetences', payload: string[] }
   | { type: '[Linked] - setSelectedSubcompetence', payload: string }
   | { type: '[Linked] - setRelations', payload: Relation[] }

export const linkedReducer = (state: LinkedState, action: LinkedActionType): LinkedState => {

   switch (action.type) {
      case '[Linked] - addConnection':
         return {
            ...state,
            lines: action.payload
         }

      case '[Linked] - removeConnection':

         return {
            ...state,
            lines: action.payload
         }

      case '[Linked] - competenceSelected':
         return {
            ...state,
            selected: action.payload
         }

      case '[Linked] - setState':
         return {
            ...state,
            state: action.payload
         }

      case '[Linked] - setRelations':
         return {
            ...state,
            relations: action.payload
         }

      case '[Linked] - setCompetences':
         return {
            ...state,
            competences: action.payload
         }

      case '[Linked] - setSubcompetences':
         return {
            ...state,
            subcompetences: action.payload
         }

      case '[Linked] - setSelectedSubcompetence':
         return {
            ...state,
            selectedSubcompetence: action.payload
         }

      case '[Linked] - deleteCompetence':
         return {
            ...state,
            competences: action.payload
         }

      case '[Linked] - setLines':
         return {
            ...state,
            lines: action.payload
         }

      default:
         return state;
   }

}