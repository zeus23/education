export const addTeacher = (details) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            details.email,
            details.email
        )
        .then(()=>{
            return firestore.collection('teachers').add({
                createdAt: new Date(),
                name: details.name,
                email: details.email,
                gender: details.gender,
                phone: details.phone,
                photo: details.photo,
            })
        })
        .then(()=>{
            dispatch({type:'TEACHER_ADDED_SUCCESSFULLY', details})
        }).catch((err)=>{
            dispatch({type:'ERROR', err})
        })
    }
}

export const deleteTeacher= (id) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('teachers').doc(id).delete()
        .then(()=>{
            dispatch({
                type: 'DELETE_SUCCESS',
            });
        }).catch((err)=>{
            dispatch({
                type: 'DELETE_FAILED',
                err
            });
        })
    }
};

export const updateTeacherProfile = (profile) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('teachers').doc(profile.id).update({
            photo: profile.photo,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            gender: profile.gender,
        }).then(()=>{
            dispatch({
                type: 'UPDATE_SUCCESS',
                profile: profile
            });
        }).catch((err)=>{
            dispatch({
                type: 'UPDATE_FAILED',
                err
            });
        })
    }
};