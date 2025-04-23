'use client';
import { useState } from 'react';
import '../../css/mealInfo.css'; // to match styling with MealInfo
// import '../../css/mealForm.css'; // if you still need shared styles

interface Meal {
  _id: string;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  sourceUrl?: string;
  cheap?: boolean;
  diets?: [string];
  summary?: string;
}

interface EditMealProps {
  meal: Meal;
  closeForm: () => void;
  onUpdate: () => void;
}

export default function EditMealInfo({ meal, closeForm, onUpdate }: EditMealProps) {
  const [isErrored, setIsErrored] = useState(false);

  const [formArgs, setFormArgs] = useState({
    title: meal.title,
    readyInMinutes: meal.readyInMinutes,
    cheap: meal.cheap,
    diets: meal.diets,
    summary: meal.summary,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('MEAL TO SUBMIT: ', meal);
    try {
      const response = await fetch(`/api/meals/${meal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formArgs),
      });

      if (!response.ok) {
        setIsErrored(true);
      } else {
        onUpdate();
        closeForm();
      } 
    } catch (error) {
      setIsErrored(true);
    }
  };

  const handleEnterKeyToNextField = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      e.key === 'Enter' &&
      e.target instanceof HTMLInputElement &&
      e.target.type !== 'textarea'
    ) {
      e.preventDefault();
      const form = e.currentTarget;
      const index = Array.prototype.indexOf.call(form.elements, e.target);
      const nextElement = form.elements[index + 1] as HTMLElement;
      nextElement?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number'
        ? Number(value)
        : value;

    setFormArgs((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div className="meal-modal-overlay" onClick={closeForm}>
      <div className="meal-modal" onClick={(e) => e.stopPropagation()}>
        <button className="meal-close-button" onClick={closeForm}>
          &times;
        </button>

        <div className="meal-info">
          <img
            src="/../images/Hangry-Bear-Transparent.png"
            alt="Hangry Logo"
            width={400}
            height={400}
          />

          <form onSubmit={handleSubmit} onKeyDown={handleEnterKeyToNextField} className="meal-form">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formArgs.title}
              onChange={handleChange}
              className="meal"
            />

            <label htmlFor="readyInMinutes">Ready In (minutes)</label>
            <input
              id="readyInMinutes"
              name="readyInMinutes"
              type="number"
              value={formArgs.readyInMinutes}
              onChange={handleChange}
              className="meal"
            />

            <label htmlFor="diets">Diets</label>
            <input
              id="diets"
              name="diets"
              type="text"
              value={formArgs.diets}
              onChange={handleChange}
              className="meal"
            />

            <div className="checkbox-area">
              <label htmlFor="cheap">Budget Friendly?</label>
              <input
                id="cheap"
                name="cheap"
                type="checkbox"
                checked={formArgs.cheap}
                onChange={handleChange}
                className="meal"
              />
            </div>

            <label htmlFor="summary">Summary</label>
            <input
              id="summary"
              name="summary"
              type="text"
              value={formArgs.summary}
              onChange={handleChange}
              className="meal"
            />

            <button type="submit" className="edit-button">
              Submit Changes
            </button>

            {isErrored && (
              <h2 className="meal-error-message">
                Error updating meal
              </h2>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}


// 'use client';
// import { useState } from 'react';
// // import '../../css/mealForm.css';
// import '../../css/mealInfo.css';


// interface Meal {
//     id: string;
//     title?: string;
//     image?: string;
//     readyInMinutes?: number;
//     sourceUrl?: string;
//     cheap?: boolean;
//     diets?: [string];
//     summary?: string;
// }

// interface editMealProps{
//     // onEditForm: (newMeal: string) => void;
//     meal: Meal;
//     closeForm: () => void;
// }

// export default function EditMealInfo ({ meal, closeForm }: editMealProps) {
//     const [isErrored, setIsErrored] = useState(false);

//     const[formArgs, setFormArgs ] = useState({
//         title: meal.title, 
//         readyInMinutes: meal.readyInMinutes,
//         cheap: meal.cheap,
//         diets: meal.diets,
//         summary: meal.summary,     
//     });

//     const handleSubmit = async (e: React.FormEvent)=>{
//         e.preventDefault();

//         setFormArgs({
//             title: formArgs.title, 
//             readyInMinutes: formArgs.readyInMinutes,
//             cheap: formArgs.cheap,
//             diets: formArgs.diets,
//             summary: formArgs.summary,    
//         });

//         try{
//             console.log('Editing MEAL: ', formArgs.title);
//             const response = await fetch('/api/meals', {
//                 method: 'PUT',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formArgs),
//             });
//             if (!response.ok) {
//                 setIsErrored(true);
//             }
//             const newMeal = await response.json();
//             if (!newMeal) {
//                 setIsErrored(true);
//             } else {
//                 // onEditForm(newMeal);
//                 closeForm();    
//             }
//         } catch (error) {
//             // console.error('Error creating meal');

//         }
//     } 
    
//     function handleEnterKeyToNextField(e: React.KeyboardEvent<HTMLFormElement>) {
//         if (
//           e.key === 'Enter' &&
//           e.target instanceof HTMLInputElement &&
//           e.target.type !== 'textarea'
//         ) {
//           e.preventDefault();
//           const form = e.currentTarget;
//           const index = Array.prototype.indexOf.call(form.elements, e.target);
//           const nextElement = form.elements[index + 1] as HTMLElement;
//           nextElement?.focus();
//         }
//       }

//       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const target = e.target;
      
//         const { name, value, type } = target;
      
//         const newValue =
//           type === 'checkbox'
//             ? (target as HTMLInputElement).checked
//             : type === 'number'
//             ? Number(value)
//             : value;
      
//         setFormArgs(prev => ({
//           ...prev,
//           [name]: newValue,
//         }));
//       };      

//     return(
//     <div className = "meal-form-container">
//         <form onSubmit = {handleSubmit} onKeyDown={handleEnterKeyToNextField} className="form-style">
//         <img 
//         src="/../images/Hangry-Bear-Transparent.png"
//         alt="Hangry Logo"
//         width={400}
//         height={400}
//         />
//             <label htmlFor="search">Title</label>
//             <input
//                 id = "search"
//                 name = "search"
//                 type="string"
//                 value={formArgs.title}
//                 onChange={handleChange}
//                 className="meal"
//             />
//             <label htmlFor="cuisine">Ready In: </label>            
//             <input
//                 id = "cuisine"
//                 name = "cuisine"
//                 type="string"
//                 value={formArgs.readyInMinutes}
//                 onChange={handleChange}
//                 className="meal"
//             />
//             <label htmlFor="maxReadyTime">Diets: </label>
//             <input
//                 id = "maxReadyTime"
//                 name = "maxReadyTime"
//                 type="number"
//                 value={formArgs.diets}
//                 onChange={handleChange}
//                 className="meal"
//             />
//             <div className='checkbox-area'>
//                 <label htmlFor="cheap" style={{ marginLeft: '0px' }}>
//                     Budget<br></br>Friendly?
//                     <br></br>
//                 </label>
//                 <input
//                     id = "cheap"
//                     name = "cheap"
//                     type="checkbox"
//                     checked={formArgs.cheap}
//                     onChange={handleChange}
//                     className="meal"
//                 />
//             </div>
//             <label htmlFor="diet">Summary: </label>
//             <input
//                 id = "diet"
//                 name = "diet"
//                 type="string"
//                 value={formArgs.summary}
//                 onChange={handleChange}
//                 className="meal"
//             />

//         <button type='submit' className='submit-form-button'>
//             Submit Changes
//         </button>

//         {isErrored && (
//             <h2 className='error-message'>No meals found with these specifications</h2>
//         )}

            
//         </form>
//         </div>
//     );
// }