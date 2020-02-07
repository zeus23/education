export const admission = (details) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            details.email,
            details.email
        )
        .then(()=>{
            return firestore.collection('students').add({
                createdAt: new Date(),
                name: details.name,
                email: details.email,
                address: details.address,
                gender: details.gender,
                phone: details.phone,
                class: details.class,
                fees: details.fees,
                gName: details.gname,
                gPhone: details.gphone,
                photo: details.photo,
                dob: details.dob,
                upcoming:  details.upcoming,
                results: details.results,
                qr: "https://api.qrserver.com/v1/create-qr-code/?data="+details.email+"&amp;size=100x100",
                subjects: details.subjects,
                attendance: details.attendance
            })
        })
        .then(()=>{
            dispatch({type:'ADMISSION_SUCCESS', details})
        }).catch((err)=>{
            dispatch({type:'ADMISSION_ERROR', err})
        })
    }
}

export const deleteStudent= (id) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('students').doc(id).delete()
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

export const updateStudentProfile = (profile) => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('students').doc(profile.id).update({
            photo: profile.photo,
            name: profile.name,
            email: profile.email,
            address: profile.address,
            phone: profile.phone,
            gender: profile.gender,
            dob: profile.dob,
            gName: profile.gname,
            gPhone: profile.gphone
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