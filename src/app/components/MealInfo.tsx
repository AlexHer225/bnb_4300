import React from 'react';
import Meal from '../models/mealSchema';
import '../../css/mealInfo.css';


interface Meal {
    id: string;
    title?: string;
    image?: string;
    readyInMinutes?: number;
    sourceUrl?: string;
    cheap?: boolean;
    diets?: [string];
    summary?: string;
}

interface MealInfoProps {
    meal: Meal;
    onClose: () => void;
}

function MealInfo({ meal, onClose }: MealInfoProps ) {
    return (
        <>
            <div className="meal-modal-overlay" onClick={onClose}>
            <div className="meal-modal" onClick={(e) => e.stopPropagation()}>
                <button className="meal-close-button" onClick={onClose}>×</button>
                <h2 className="meal-title-info">{meal.title}</h2>
                <img src={meal.image} alt={meal.title} className="meal-image-info" />
                <dl className="meal-info-details">
                    <div className="meal-info-item">
                        <dt><strong>Ready in:</strong></dt>
                        <dd>{meal.readyInMinutes} minutes</dd>
                        <br></br>
                    </div>
                    
                    <div className="meal-info-item">
                        <dt><strong>Budget Friendly?:</strong></dt>
                        <dd>{meal.cheap ? 'Yes' : 'No'}</dd>
                        <br></br>
                    </div>
                    
                    {meal.diets?.length > 0 && (
                        <div className="meal-info-item">
                        <dt><strong>Diets:</strong></dt>
                        <dd>{meal.diets.join(', ')}</dd>
                        <br></br>
                        </div>
                        
                    )}
                    
                    <div className="meal-info-item">
                        <dt><strong>Summary:</strong></dt>
                        <p dangerouslySetInnerHTML={{ __html: meal.summary || '' }}></p>
                    </div>
                    
                    <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer" className="meal-link">
                        View full recipe
                    </a>
                    </dl>
                </div>
            </div>
            
            <h2></h2>
        </>
    );
}

export default MealInfo;