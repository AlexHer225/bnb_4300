import React from 'react';
import Meal from '../models/mealSchema';
import connectMongoDB from '../../../config/mongodb';
import mongoose, { mongo } from 'mongoose';
import '../../css/mealInfo.css';


interface Meal {
    id: string;
    title: string;
    image: string;
    readyInMinutes: number;
    sourceUrl: string;
    cheap: boolean;
    diets?: [string];
    summary?: string;
}

interface MealInfoProps {
    meal: Meal;
    onClose: () => void;
}

function MealInfo({ meal, onClose }: MealInfoProps ) {
    connectMongoDB;
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
                    </div>
                    
                    <div className="meal-info-item">
                        <dt><strong>Cheap:</strong></dt>
                        <dd>{meal.cheap ? 'Yes' : 'No'}</dd>
                    </div>
                    
                    {meal.diets?.length > 0 && (
                        <div className="meal-info-item">
                        <dt><strong>Diets:</strong></dt>
                        <dd>{meal.diets.join(', ')}</dd>
                        </div>
                    )}
                    
                    <div className="meal-info-item">
                        <dt><strong>Summary:</strong></dt>
                        <dd dangerouslySetInnerHTML={{ __html: meal.summary || '' }}></dd>
                    </div>
                    
                    <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer" className="meal-link">
                        View full recipe
                    </a>
                    </dl>
                </div>
            </div>
            <h2>MEAL INFO</h2>
        </>
    );
}

export default MealInfo;