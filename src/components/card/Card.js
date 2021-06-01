import React from 'react';
import styles from './card.module.css';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import { changeFavsRedux } from '../../redux/charsDuck';
import firebase from 'firebase/app'
import 'firebase/firestore'

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

function onClick(side) {
    return () => console.log(side)
}

const Card = ({ name, image, rightClick, leftClick, hide, FAVS, changeFavsRedux }) => {

  let idUser = JSON.parse(localStorage.getItem('user'))

  const deleteFav = (name) => {

    if(idUser && idUser.user && idUser.user.id){
      var uid = idUser.user.id
      db.doc(uid).get()
      .then(snap => {
        let arr = snap.data().array
        for(let i = 0; i < arr.length; i++){
          for(let j = 0; j < FAVS.length; j++){
            if(arr[i].name === name && FAVS[i].name === name){
              let newFav = FAVS.filter(point => point.name !== name)
              db.doc(uid).update({
                array: newFav
              })
              changeFavsRedux(newFav)
            }
          }
        }
      })
    }
  }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <button onClick={()=> deleteFav(name)}>x</button>
                <img alt="character" src={image} />
                <p className={styles.name}>
                    {name}
                </p>
            {!hide && <div className={styles.actions}>
                <div
                    onClick={leftClick || onClick("left")}
                    className={styles.left}>
                    <FontAwesome
                        name="thumbs-down"
                        size="2x"
                    />
                </div>
                <div
                    onClick={rightClick || onClick("right")}
                    className={styles.right}>
                    <FontAwesome
                        name="heart"
                        size="2x"
                    />
                </div>
            </div>}
            </div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    leftClick: PropTypes.func,
    rightClick: PropTypes.func,
}

Card.defaultProps = {
    name: "Rick Sanches",
    image: rick,
}

const mapStateToProps = (state) => {
  return {
    FAVS: state.characters.favorites
  }
}

export default connect(mapStateToProps,{changeFavsRedux})(Card);
