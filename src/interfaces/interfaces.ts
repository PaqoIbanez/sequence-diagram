
export interface Line {
   subcompetence: string,
   start: string;
   end: string;
   labels: {
      start: 'A' | 'B' | 'C' | 'D' | 'E',
      end: 'B' | 'C' | 'D' | 'E' | 'F'
   };
   color?: string;
};

export interface Competence {
   id: string;
   name: string;
   semester: number;
}

export interface Column {
   name: string;
   items: any[]
}

export interface Competence {
   id: string;
   name: string;
   semester: number;
   uf_id: number;
};

export interface Subcompetence {
   [key: string]: {
      competences: Competence[]
   }
};

export type State = "normal"
   | "addConnection"
   | "removeConnection"
   | "delete"
   | "edit"
   | "addSubcompetence"
   | "newSubcompetence";


export interface RelationAPI {
   data: Relation[];
   message: string;
   success: boolean;
}

export interface Relation {
   from: Competence;
   name: string;
   to: Competence;
}


