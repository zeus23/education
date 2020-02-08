export const classes = (details) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log(details.subjects);
        firestore.collection('classes').add({
            class: details.class,
            subjects: details.subjects
        }).then(()=>{
            dispatch({type:'CLASS_ADDED', details})
        }).catch((err)=>{
            dispatch({type:'CLASS_NOT_ADDED', err})
        })
    }
}

export const deleteClass= (id) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('classes').doc(id).delete()
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

export const addSubs = (subdetails) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection("classes").doc(subdetails.id).get()
        .then(snapshot=>{
                var prevSubjects = {},final={};
                prevSubjects = snapshot.data().subjects;
                final=prevSubjects.concat(subdetails.classSubject);
                firestore.collection("classes").doc(subdetails.id).update({
                    subjects :final
                }).then(()=>{
                    dispatch({type:'SUBJECT_ADDED', subdetails})
                }).catch((err)=>{
                    dispatch({type:'SUBJECT_NOT_ADDED', err})
                })
        })
    }
}