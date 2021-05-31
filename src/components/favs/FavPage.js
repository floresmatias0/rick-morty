import React from 'react';
import styles from './favs.module.css';
import Card from '../card/Card';
import { connect } from 'react-redux';
import { db } from '../../firebase'

const FavPage = ({ FAVS }) => {

  console.log(db)

const erase = () => {
  if(FAVS && FAVS.characters && FAVS.characters.favorites){
    let arrRedux = FAVS.characters.favorites
    // let arrFirebase =
    console.log(arrRedux)
  }
}

    return (
      <>
      {FAVS.characters.favorites ? (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {FAVS.characters.favorites.map((point,i) => {
              return (
                <Card name={point.name} image={point.image} hide key={i} />
              )
            })}
            <button onClick={erase}> borrar todo </button>
        </div>
      ):(
        <div className={styles.container}>
            <h2>No hay personajes agregados</h2>}
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

export default connect(mapStateToProps)(FavPage);
