import { MouseEvent, useContext, useState } from 'react';
import { LinkedContext } from '../context/LinkedContext';
import { Subcompetence } from '../interfaces/interfaces';

export const SubCompetencesBar = () => {

   const { state, setState, subcompetences, setSubcompetences, selectedSubcompetence, setSelectedSubcompetence } = useContext(LinkedContext);
   const [subcompetenceName, setSubCompetenceName] = useState('');

   const [error, setError] = useState({
      isError: false,
      message: ''
   });

   const handleName = () => {
      if (subcompetences.includes(subcompetenceName)) {
         return setError({ isError: true, message: 'Subcompetence ID already exists' })
      };
      setSelectedSubcompetence(subcompetenceName);
      setSubcompetences([...subcompetences, subcompetenceName])
      setError({ isError: false, message: '' })
      setState('newSubcompetence');
   }

   return (
      <div style={{
         width: 200,
         float: 'left',
         marginLeft: 10
      }}>
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
               !(state === 'addSubcompetence') &&
               <button onClick={() => setState('addSubcompetence')}>New Subcompetence</button>
            }
            {
               state === 'addSubcompetence' &&
               <input
                  type='text'
                  placeholder='Subcompetence ID'
                  value={subcompetenceName}
                  onChange={(e) => setSubCompetenceName(e.target.value)}
               />
            }
            {
               error.isError && state === 'addSubcompetence' &&
               <div style={{ backgroundColor: 'red', fontSize: 12, color: 'white', padding: 5 }}>
                  {error.message}
               </div>
            }
            {
               state === 'addSubcompetence' &&
               <>
                  <button onClick={() => handleName()} disabled={!(subcompetenceName.trim().length > 0)}>
                     Add
                  </button>
                  <button onClick={() => setState('normal')}>
                     Cancel
                  </button>
               </>
            }
         </div>
      </div>
   )
}