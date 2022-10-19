import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { LinkedContext } from '../context/LinkedContext';
import { Competence } from '../interfaces/interfaces';

interface Props {
   setIsAddButtonClicked?: Dispatch<SetStateAction<boolean>>;
   columnId: string;
   competence?: Competence;
}

export const AddForm = ({ setIsAddButtonClicked, columnId, competence }: Props) => {

   const { addCompetence, competences } = useContext(LinkedContext);

   const [id, setId] = useState(competence ? competence.id : '');
   const [name, setName] = useState(competence ? competence.name : '');
   const [error, setError] = useState(false);

   const handleFormSubmit = () => {

      if (error) return;
      if (id === '' || name === '') return;

      addCompetence({
         id,
         name,
         semester: Number.parseInt(columnId),
         uf_id: 1
      });

      setIsAddButtonClicked && setIsAddButtonClicked(false)
   }

   const onChangeID = (id: string) => {
      const IdExists = competences.find(competence => competence.id === id);
      setId(id);

      if (IdExists) {
         return setError(true);
      } else {
         setError(false);
      }
   }

   return (
      <div className='form'>
         <input type='text' placeholder="ID" className="input-form" value={id} onChange={(e) => onChangeID(e.target.value)} />
         <input type='text' placeholder="Nombre" className="input-form" value={name} onChange={(e) => setName(e.target.value)} />
         {
            error && <div style={{ backgroundColor: 'red', color: 'white' }}>Este ID ya existe</div>
         }
         <button className="form-button" onClick={handleFormSubmit}>Agregar</button>
         <button className="form-button" onClick={() => setIsAddButtonClicked && setIsAddButtonClicked(false)}>Cancelar</button>
      </div>
   )
}