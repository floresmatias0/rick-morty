import React from 'react';
import styles from './favs.module.css';
import Card from '../card/Card';
import { connect } from 'react-redux';
import { changeFavsRedux } from '../../redux/charsDuck';

const FavPage = ({ FAVS,changeFavsRedux }) => {

const erase = () => {
  if(FAVS && FAVS.characters && FAVS.characters.favorites){
    let arrRedux = FAVS.characters.favorites
    let filtrado = arrRedux.filter(point => point.length === 0)
    changeFavsRedux(filtrado)
  }
}

    return (
      <>
      {FAVS.characters.favorites.length > 0 ? (

        <div className={styles.container}>
            <h2>Favoritos</h2>
            <div className={styles.cardContent}>
              {FAVS.characters.favorites.map((point,i) => {
                return (
                  <Card
                    name={point.name}
                    image={point.image}
                    hide
                    key={i} />
                )
              })}
            </div>
            <button onClick={erase}> borrar todo </button>
        </div>
      ):(
        <div className={styles.container}>
            <h2>No hay personajes agregados</h2>
        </div>
      )}
      </>
    )
}

const mapStateToProps = (state) =>{
  return {
    FAVS: state
  }
}

export default connect(mapStateToProps,{ changeFavsRedux })(FavPage);
