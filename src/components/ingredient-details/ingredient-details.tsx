import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { getSelectedIngredients } from '../../services/slices/IngredientsSlice';
import { useParams } from 'react-router-dom';
import styles from '../app/app.module.css';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getSelectedIngredients);
  const { id } = useParams();

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
